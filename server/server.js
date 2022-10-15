//Configure .env variables
require('dotenv').config({path: '../.env'});
//Modules
const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const Pusher = require('pusher');


const app = express()
const port = 3001


//App Settings
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());

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
app.post('/:roomname/:roomid', (req, res) => {
    const payload = req.body;
    pusher.trigger(req.body.roomStr, 'message', payload);
    res.send(payload);
})

//Send the images from files
app.post('uploadfile', (req, res) => {
    if(!req.files){
        return res.status(404).send({ msg: "File not Found"})
    }

    const imageFile = req.files.file;
       //  mv() method places the file inside public directory
       imageFile.mv(`${__dirname}/public/${imageFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: imageFile.name, path: `/${imageFile.name}`});
    });
})

app.listen(app.get('PORT'), () => {
    console.log("Listening on port " + app.get('PORT'));
})