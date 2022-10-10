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
app.use(express.static('public'));

//Create pusher object
const pusher = new Pusher({
    appId: process.env.REACT_APP_PUSHER_APP_ID,
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    secret: process.env.REACT_APP_PUSHER_APP_SECRET,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    encrypted: true
});

//App uses

app.set('PORT', port);

app.post('Game/:id', (req, res) => {

})

//Retrieve the current usernames
app.post('/usernames', (req, res) => {
    const payload = req.body;
    pusher.trigger('displayed', 'usernames', payload);
    res.send(payload);
})

app.listen(app.get('PORT'), () => {
    console.log("Listening on port " + app.get('PORT'));
})