console.log('------------------in js file-------------')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>
// {
//    // console.log(data)
// })
// })



const weatherForm =document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')
const messagethree=document.querySelector('#message-3')
messageone.textContent=''
messagetwo.textContent=''
messagethree.textContent=''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
        const location=search.value
        messageone.textContent='Loading...'
       // console.log(location,location)
        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{

        if(data.error){
            messagetwo.textContent=data.error;
            console.log(data.error)
        }else{
            
            console.log(data)
            messageone.textContent='Location-'+data.Location
            forcast=JSON.stringify(data.Forecast.data)
            messagetwo.textContent='Summary-'+data.Forecast.data.daily.data[0].summary
            messagethree.textContent='Summary-'+data.Forecast.data.currently.temperature+' degree  Celsius'
            
            console.log(data)
            console.log(data.Location)
            console.log(data.Forecast.data.summary)
            var d = new Date(data.Forecast.data.time*1000);
            var yr=d.getFullYear()
            var month=d.getMonth()
            var date=d.getDate()
            console.log(d,yr+''+month+''+date)

         
        }



      
    })
})

})
