const express =require('express')
const request =require('request')
const geocode =require('./utils/geocode')
const forcast =require('./utils/forcast')
const path=require('path')
const hbs = require('hbs')



const app=express()
const port=process.env.PORT || 3000
//Define paths for Express Config
const publicDir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')




//console.log(publicDir)
//hbs is view engine to render dynamic doc
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup setup dir
app.use(express.static(publicDir))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'sam'
    })
})
app.get('/help',(req,res)=>{
    res.send('Help me')
})
app.get('/contact',(req,res)=>{
    res.send('contact me')
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
      return  res.send({
            error:'Plz enter the address'})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
         return   res.send({
                error:error})
        }
                 
            const cord={
                 lat:latitude,
                 long:longitude
                //  lat:0,
                // long:0
            }
            forcast(cord,(error,forcastdata)=>{
                if(error)
                {
                    return  res.send({
                        forcasterror:error})
                
                }
    
                res.send(
                    {
                        Location:location,
                        Forecast:forcastdata
                    })
                
            })
    })

})
app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({ 
            error:'U must search something'
        })
    }
    console.log(req.query)
    res.send('in product')
   
})
app.get('*',(req,res)=>{
    res.render('error',{
        msg:'404 Page not found!!!!!!'
    })
})

app.listen(port,()=>{
    console.log('Server is running on '+ port)
})