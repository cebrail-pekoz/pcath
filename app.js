const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Merhaba');
});

// ***** Server Çalıştırma
const port = 3000;
const localHost = '127.0.0.1';
app.listen(port, () => {
    console.log(`Server Çalışıyor >>> http://${localHost}:${port}`);
});
// ***** //Server Çalıştırma
