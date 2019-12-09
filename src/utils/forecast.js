const request=require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='https://api.darksky.net/forecast/bae1779a27504c1ed2e191619849e579/'+latitude+','+longitude

    request({  url , json: true},(error,{body})=>{

        if(error){
            callback("Non posso connettermi al servizio di Previsioni Meteo!",undefined)
        }else if(body.error){
            callback("Non riesco ad identificare il luogo",undefined)
        }else{
            const temperature=Math.round((body.hourly.data[0].temperature-32)*(5/9))+'C'
            callback(undefined,body.daily.data[0].summary+' The temperature is '+temperature+' and the probability of precipitation is '+body.currently.precipProbability*100+'%')
        }
    })

}

module.exports=forecast

