// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

/*Dependencies*/
const bodyParser = require('body-parser')

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'))

// Setup Server
const port = 8042;
const server = app.listen(port, listening);

function listening() {
    console.log('Server is all good')
    console.log(`Running on localhost: ${port}`)
}

// Endpoint for all routes
let projectData = {}

//set GET route to return projectData{}
app.get('/all', getProjectData)
 function getProjectData(req, res) {
     res.send(projectData)
     console.log(projectData)
 }

//Set POST route to add incoming data to projectData{}
app.post('/addData', addData);

function addData(req, res){
    const data = req.body
    newData = {
        temperature: data.temperature,
        date: data.date,
        userResponse: data.userResponse,
}
    Object.assign(projectData, newData);
    res.send(projectData)
}
