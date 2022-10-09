//Modules
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const path = require('path');

const app = express()
const port = 3001

//App Settings
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

app.set('PORT', port || 5000);

//Getting HTML
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../public/index.html'));
    //res.render('../index.js');
  });

app.post('Game/:id', (req, res) => {

})

app.post('/message', (req, res) => {
    const payload = req.body;
    pusher.trigger('chat', 'message', payload);
    res.send(payload);
})

app.listen(app.get('PORT'), () => {
    console.log("Listening on port " + app.get('PORT'));
})