console.log('My JS Script')


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')

const locationField=document.querySelector('#location')
const message=document.querySelector('#message')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    message.textContent='Loading ...'
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then( ({error,location,forecastData})=> {
        if(error){
            message.textContent=error
        }

        else{
            locationField.textContent=location
            message.textContent=forecastData
        }
    }
    )
    })
})