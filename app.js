var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    sys = require('util'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require('./models/user'),
    mongoose = require('mongoose');

var indexRoutes = require('./routes/index'),
    appointmentRoutes = require('./routes/appointments');

mongoose.connect('mongodb://localhost/auth_demo_app', {
    useNewUrlParser: true
});

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(
    require('express-session')({
        secret: 'Rusty is the best and cutest dog in the world',
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static(__dirname + '/public'));

app.post('/image', (req, res) => {
    // strip off the data: url prefix to get just the base64-encoded bytes
    var data = req.body.img.replace(/^data:image\/\w+;base64,/, '');
    var buf = new Buffer(data, 'base64');
    var datetime = new Date();
    fs.writeFile(`public/assets/images/image${datetime}.png`, buf, err => {
        if (err) console.log(err);
    });
    quickstart(datetime, res);
});
app.post('/reciept',(req,res) => {
    var data = req.body.img.replace(/^data:image\/\w+;base64,/, '');
    var buf = new Buffer(data, 'base64');
    var datetime = new Date();
    fs.writeFile(`public/assets/images/image${datetime}.png`, buf, err => {
        if (err) console.log(err);
    });
    quickstart2(datetime, res); 
})

async function quickstart(datetime, res) {
    const myImage = `./public/assets/images/image${datetime}.png`;
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const [result] = await client.documentTextDetection(myImage);
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log(fullTextAnnotation.text.split('\n'));
    res.render('drivinglicence', { rikki_text: fullTextAnnotation.text });
}
async function quickstart2(datetime, res) {
    const myImage = `./public/assets/images/image${datetime}.png`;
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const [result] = await client.documentTextDetection(myImage);
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log(fullTextAnnotation.text.split('\n'));
    res.render('reciept', { rikki_text: fullTextAnnotation.text });
}

app.get('/reciept', (req, res) => {
    res.render('reciept');
});
app.use(indexRoutes);
app.use('/appointments', appointmentRoutes);

app.listen(5000, function() {
    console.log('Authentication demo started');
});
