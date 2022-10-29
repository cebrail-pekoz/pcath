// ***** Modüller
const express = require('express'); // node.js server çatısı modülü
const path = require('path'); // node.js dizin ve dosya yolu modülü
const ejs = require('ejs'); // template engine modülü
const mongoose = require('mongoose'); // mongoDB nesne modelleme modülü
const fs = require('fs'); // dosya işlemleri
// !! taryıcılar 'put' ve 'delete' requesti desteklemediği için post requesti simule/değiştirme yapmak için override modülü kullanılır.
const methodOverride = require('method-override'); // override modülü
const fileUpload = require('express-fileupload'); // dosya yükleme modülü
const Photo = require('./models/Photo'); // oluşturulan 'PhotoSchema' şeması modülü
// ***** //Modüller

const app = express(); // express uygulaması

// ***** Veritabanı Bağlanma
mongoose.connect('mongodb://127.0.0.1/pcath-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// ***** Veritabanı Bağlanma

// ***** Middleware
app.use(express.static('public')); // statik dosyalar
app.use(express.urlencoded({ extended: true })); // body verilerini alma
app.use(express.json()); // body verilerini json formatına çevirme
app.use(fileUpload()); // dosya yükleme modülünü uygulamaya dahil etme
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'], // hangi metotların değişeceğini belirtle
    })
); // override modülünü dahil etme
// ***** //Middleware

// ***** Template Engine
app.set('view engine', 'ejs'); // kullanılacak template engine uygulamaya dahil etme
// ***** //Template Engine

// ***** Yönlendirmeler
app.get('/', async (req, res) => {
    // fotoğrafları anasayfada gösterme
    const photos = await Photo.find({}).sort('-dateCreated'); // tarihe göre sıralama
    res.render('index', { photos });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add', (req, res) => {
    res.render('add');
});

//  form'dan veriler asenkron olarak alınıp veritabanına kaydedilir
app.post('/photos', async (req, res) => {
    // console.log(req.files.photoImage);
    // console.log(req.body);
    // verileri model yardımıyla veritabanına gönderme
    // await Photo.create(req.body);
    // res.redirect('/');

    // yeni klasör oluşturma
    const uploadDir = 'public/uploads';
    // eğer klasör yoksa oluştur
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.photoImage; // yüklenen resmi yakalama
    let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name; // resmi klasöre atma
    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body, // body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz
            image: '/uploads/' + uploadedImage.name, // resim yolu
        });
        res.redirect('/');
    });
});

app.get('/photos/:id', async (req, res) => {
    // console.log(req.params.id); // body'den fotoğrafın id değerini alma
    const photo = await Photo.findById(req.params.id); // veritabanında id değerine sahip fotoğrafı bulma
    res.render('photo', { photo }); // bulunan fotoğrafı sayfaya gönderme
});

// güncelleme sayfası
app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id }); // veriyi yakalama
    res.render('edit', { photo }); // ilgili verinin sayfasına gitme
});

// güncelleme -put
app.put('/photos/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id }); // veriyi yakalama
    photo.title = req.body.title; // title değeri body title değerine eşitleme
    photo.description = req.body.description; // description değeri body içerisindeki description değerine eşitleme
    photo.save();
    res.redirect(`/photos/${req.params.id}`); // ilgili verinin sayfasına gitme
});

// silme işlemi
app.delete('/photos/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id }); // id değerine göre veritabanından bulma
    let deletedImage = __dirname + '/public' + photo.image; // ilgili resim adresi
    fs.unlinkSync(deletedImage); // resmi silme
    await Photo.findByIdAndRemove(req.params.id); // id değerine göre veritabanından sile
    res.redirect('/');
});

// ***** //Yönlendirmeler

// ***** Server Çalıştırma
const port = 3000;
const localHost = '127.0.0.1';
app.listen(port, () => {
    console.log(`Server Çalışıyor >>> http://${localHost}:${port}`);
});
// ***** //Server Çalıştırma
