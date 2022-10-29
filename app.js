// ***** Modüller
const express = require('express'); // node.js server çatısı modülü
const ejs = require('ejs'); // template engine modülü
const mongoose = require('mongoose'); // mongoDB nesne modelleme modülü
// -- tarayıcılar 'put' ve 'delete' requesti desteklemediği için post requesti simule etmek/değiştirmek için 'method-override' modülü kullanılır.
const methodOverride = require('method-override'); // override modülü
const fileUpload = require('express-fileupload'); // dosya yükleme modülü
const photoController = require('./controllers/photoController'); // fotoğraf yönlendirmeleri için controller
const pageController = require('./controllers/pageController'); // sayfalar için kontroller
// ***** //Modüller

const app = express(); // express uygulaması

// ***** Veritabanı Bağlanma
mongoose.connect('mongodb://127.0.0.1/pcath-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// ***** Veritabanı Bağlanma

// ***** Middleware
app.use(express.static('public')); // statik dosyaların yolu
app.use(express.urlencoded({ extended: true })); // body verilerini alma
app.use(express.json()); // body verilerini json formatına çevirme
app.use(fileUpload()); // dosya yükleme modülünü uygulamaya dahil etme
app.use(
    methodOverride('_method', {
        // override modülünü dahil etme
        methods: ['POST', 'GET'], // hangi metotların değişeceğini belirtme
    })
);
// ***** //Middleware

// ***** Template Engine
app.set('view engine', 'ejs'); // kullanılacak template engine uygulamaya dahil etme
// ***** //Template Engine

// ***** Yönlendirmeler

app.get('/', photoController.getAllPhotos); // anasayfa
app.get('/photos/:id', photoController.getPhoto); // tekil fotoğraf sayfası
app.post('/photos', photoController.createPhoto); // yeni fotoğraf oluşturma sayfası
app.put('/photos/:id', photoController.updatePhoto); // güncelleme -put
app.delete('/photos/:id', photoController.deletePhoto); // silme işlemi

app.get('/about', pageController.getAboutPage); // about sayfası
app.get('/add', pageController.getAddPhotoPage); // addphoto sayfası
app.get('/photos/edit/:id', pageController.getEditPage); // güncelleme sayfası

// ***** //Yönlendirmeler

// ***** Server Çalıştırma
const port = 3000;
const localHost = '127.0.0.1';
app.listen(port, () => {
    console.log(`Server Çalışıyor >>> http://${localHost}:${port}`);
});
// ***** //Server Çalıştırma
