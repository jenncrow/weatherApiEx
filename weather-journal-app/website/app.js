

/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=01478213d8325cf7d714c6e2231d9a5b';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear()


//Button event listener, triggers API call 
document.getElementById('generate').addEventListener('click', getWeatherData)

function getWeatherData(e) {
    let zipCode = document.getElementById('zip').value;
    let userResponse = document.getElementById('feelings').value;
    getData(baseURL, zipCode, apiKey)
    .then(function(data){
//Receive data, post and then update UI dynamically
     postData('/addData', {temperature: data.main.temp, date: newDate, userResponse: userResponse})
    })
    .then(() => updateUI())
}

//GET call to Open Weather API 
const getData = async (baseURL, zip, apiKey) => {
    const res = await fetch(baseURL + zip + apiKey, {
        method: 'GET'
    })

    try{
        const weatherData = await res.json()
        console.log(weatherData)
        return weatherData
    }
    catch(error) {
        console.log('error', error)
    }
}

//POST request to route  
const postData = async (url = '', data = {}) => {
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(data),
    });
    
    try {
        const newUserData = await response.json()
        console.log(newUserData)
        return newUserData
    }
    catch(error) {
        console.log('error', error)
    }
     }

//Upddate UI
const updateUI = async () => {
    const request = await fetch('/all')

    try{
        const entryData = await request.json()
        console.log(entryData)
    document.getElementById('date').innerHTML = entryData.date;
    document.getElementById('temp').innerHTML = entryData.temperature;
    document.getElementById('content').innerHTML = entryData.userResponse;
    
 }
    catch(error) {
        console.log('error', error)
    }
}

//Clear current entry
document.getElementById('clear').addEventListener('click', clearEntry)

function clearEntry(e) {
    e.preventDefault()
    let zip = document.getElementById('zip')
    let userResponse = document.getElementById('feelings')
    zip.value = ''
    userResponse.value = ''
    document.getElementById('date').innerHTML = ''
    document.getElementById('temp').innerHTML = ''
    document.getElementById('content').innerHTML = ''
}

