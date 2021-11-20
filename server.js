const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const bodyparser = require('body-parser')
const upload = require('express-fileupload')
    //Load env vars
dotenv.config({ path: './.env' })



//Route files
const imageRouter = require('./routes/image.js')
const authRouter= require('./routes/auth.js')
const handleError = require('./middleware/errorHandler')

//cors 
var cors = require('cors')


//Connect to database
connectDB()

const app = express()

//cors
app.use(cors())


// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Body Parser
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(upload())

// Function to serve all static files
// inside public directory.
app.use(express.static('prescriptions'));  
app.use('/images', express.static('images')); 

console.log("request made")

//Mount routers
app.use('/api/v1/images', images)


app.use(handleError)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on ip ${process.env.IP} on port ${PORT}`.yellow.bold))

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error:${err.message}`.red)
        //close and exit process
    server.close(() => process.exit(1))
})