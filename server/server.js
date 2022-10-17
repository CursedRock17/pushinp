//Modules
const express = require('express');
const multipart = require('connect-multiparty');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const cors = require('cors');
const Datastore = require('nedb');
const Pusher = require('pusher');
const path = require('path')

const app = express()
const port = process.env.PORT || 3001

//Configure .env variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env'});
  }
else {
    require('dotenv').config({ path: './.env'});
}

//App Settings
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('PORT', port);

// Setup multiparty
const multipartMiddleware = multipart();

//Create a asmall datastore object
const db = new Datastore();

//Create pusher object
var pusher = new Pusher({
    appId: process.env.REACT_APP_PUSHER_APP_ID,
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    secret: process.env.REACT_APP_PUSHER_APP_SECRET,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
});

//Create Cloudinary Object
cloudinary.config({ 
    cloud_name: process.env.REACT_APP_CLOUDNAME, 
    api_key: process.env.REACT_APP_APIKEY, 
    api_secret: process.env.REACT_APP_APISECRET
  });
//App uses





//Load up the main file
const appPath = path.join(__dirname, '../build');

app.use(express.static(appPath));
//Load all files at all links like this
app.get('*', (req, res) => {
    res.sendFile(path.join(path.join(__dirname+'/../build/index.html')))
})


//Send the current cards
app.post('/:roomname/:roomid', (req, res) => {
    const payload = req.body;
    pusher.trigger(req.body.roomStr, 'message', payload);
    res.send(payload);
})

//Send the images from files
app.post('/uploadfile',  multipartMiddleware, (req, res) => {
    cloudinary.v2.uploader.upload(req.files.image.path , {}, 
    function(error, result) {
        if (error) {
            console.log(error)
            return res.status(500).send(error);
        } 
        //req.body.roomString
        //Make an entry in the database then uplaod with pusher
        db.insert(Object.assign({}, result, req.body), (err, newDoc) => {
            pusher.trigger(req.files.image.name , 'images', {
                newDoc
            });
        res.status(200).json(newDoc);
        })
    });
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

app.listen(app.get('PORT'), () => {
    console.log("Listening on port " + app.get('PORT'));
})