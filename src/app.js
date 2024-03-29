const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express confing
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Fernando'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Fernando',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        usefulHelp:'Useful help text',
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Help article not found!'
    })
})

app.get('/products/',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:"You must provide a search term!"
        })
    }

    console.log(req.query)

    res.send({
        products: []
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"You must provide an address!"
        })
    }

    address=req.query.address;
    
    geoCode(address,(error,{latitude,longitude,location}={})=>{

        if(error)
            return res.send({
                error
            })
            
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
                return res.send({
                error: error
                })
            res.send({
                    location,
                    forecastData,
                    address
            })
        })
    })
    }
)


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage: "Page not found"
    })
})


app.listen(port,() => {
    console.log('Server is up on port'+port)
})
