const request=require('request')

const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZmVybmFuZG9kZW5pdHRvIiwiYSI6ImNrMzdmMnpmYjA5cmIzZG11MWgxZzk1d2YifQ.dkgwWTb9v1xOlR4yh0TwhQ&limit=1'

    request({  url , json: true},(error,{body})=>{

        if(error){
            callback("Errore di connessione al servizio di geoCoding",undefined)
        }else if(body.features.length==0) {
            callback("Non riesco ad ottenere i dati, controlla i dati immessi",undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports=geoCode