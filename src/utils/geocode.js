const request=require('request')

const geocode = (address,callback) =>{
     
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1Ijoic3dhcG5pbDAwMDkiLCJhIjoiY2p5bDg2eDNmMDU3aTNjbXQ5eHB3MHIxcyJ9.jBKhSqMBgahZ2TBoypTuuA'
    request({url:url,json:true},(error,response)=>{
        console.log(error)
        console.log(response)
            if(error){
                callback('Unable to connect geocoding  api!!!',undefined)
            }else if(response.body.features.length == 0){
                callback('No record found!!!',undefined)
            }else{
                callback(undefined,{
                    latitude:response.body.features[0].center[1],
                    longitude:response.body.features[0].center[0],
                    location:response.body.features[0].place_name
                })
            }
    })
}

module.exports=geocode
