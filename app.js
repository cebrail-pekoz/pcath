// ***** Modüller
const express = require('express');
const path = require('path');
// ***** //Modüller

const app = express(); // express uygulaması
app.use(express.static('public')); // statik dosyalar -middleware

// ***** Yönlendirmeler
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});
// ***** //Yönlendirmeler

// ***** Server Çalıştırma
const port = 3000;
const localHost = '127.0.0.1';
app.listen(port, () => {
    console.log(`Server Çalışıyor >>> http://${localHost}:${port}`);
});
// ***** //Server Çalıştırma
