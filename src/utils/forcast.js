const request=require('request')

 const forcast=(cord,callback)=>{
    
    const url ='https://api.darksky.net/forecast/faa368c2de58552d4f4276fb782c78d5/'+cord.lat+','+cord.long+'?units=si'

    console.log(url);
    request({url:url,json:true},(error,response)=>{
        if(error)
            { 
                callback('Unable to connect darksky weather api'+error,undefined)
               
            }else if(response.body.error){
               
                callback('unable to find loaction',undefined)
        
            }else{
                callback(undefined,{
                  //  data:response.body.daily.data[0]
                  data:response.body
                })
                 // const data=JSON.parse(response.body) because  json: true
      //  console.log(response.body.daily.data[0].summary)
        //  console.log(response.body.currently)
            }
    })
   // console.log(url)
 }

 module.exports=forcast