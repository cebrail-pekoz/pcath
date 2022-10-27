// ***** Modüller
const express = require('express');
const path = require('path');
const ejs = require('ejs');
// ***** //Modüller

const app = express(); // express uygulaması
app.use(express.static('public')); // statik dosyalar -middleware

// ***** Template Engine
app.set('view engine', 'ejs');
// ***** //Template Engine

// ***** Yönlendirmeler

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add', (req, res) => {
    res.render('add');
});
// ***** //Yönlendirmeler

// ***** Server Çalıştırma
const port = 3000;
const localHost = '127.0.0.1';
app.listen(port, () => {
    console.log(`Server Çalışıyor >>> http://${localHost}:${port}`);
});
// ***** //Server Çalıştırma
