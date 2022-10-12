//Configure .env variables
require('dotenv').config({path: '../.env'});
//Modules
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const Pusher = require('pusher');


const app = express()
const port = 3001


//App Settings
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Create pusher object
var pusher = new Pusher({
    appId: process.env.REACT_APP_PUSHER_APP_ID,
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    secret: process.env.REACT_APP_PUSHER_APP_SECRET,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
});

//App uses

app.set('PORT', port);

//Send the current cards
app.post('/cards/:gameid', (req, res) => {
    const payload = req.body;
    pusher.trigger('displayed', "cards", payload).catch((error) => {
        console.log("Error: ", error)
   });
    res.send(payload);
})

app.post('/scores/:gameid', (req, res) => {
    const payload = req.body;
    pusher.trigger('displayed', "scores", payload).catch((error) => {
        console.log("Error: ", error)
   });
    res.send(payload);
})

app.listen(app.get('PORT'), () => {
    console.log("Listening on port " + app.get('PORT'));
})