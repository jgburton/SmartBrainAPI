const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'smart-brain_'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(db.users);
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.listen(3000, () => {
    console.log('App is running on port 3000')
})