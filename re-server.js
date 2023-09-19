const { log, error } = require('console');
const exp = require('constants');
const express = require('express')
const path = require("path");
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3500

//middleware
// custom middleware
app.use(logger);

//CORS DISABLED
const whiteList =['http://localhost:3500']
const corsOpt = {
    origin: (origin, callback) => {
        log('origin');
        log(origin);
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus: 200 
}
app.use(cors(corsOpt));
//urlencode form data
app.use(express.urlencoded({extended: false}))
//built in middleware for json
app.use(express.json())
//serve static file
app.use(express.static(path.join(__dirname, '/public')))

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname})
})
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})


app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))