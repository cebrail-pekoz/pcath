// ***** Modüller
const Photo = require('../models/Photo');
const fs = require('fs');
// ***** //Modüller

// ***** Index sayfası
exports.getAllPhotos = async (req, res) => {
    const page = req.query.page || 1; // başlangıç sayfası veya ilk sayfa
    const photosPerPage = 6; // her sayfada bulunan fotoğraf sayısı
    const totalPhotos = await Photo.find().countDocuments(); // toplam fotoğraf sayısı
    const photos = await Photo.find({}) // fotoğrafları alma
        .sort('-dateCreated') // fotoğrafları sıralama
        // -- .skip((page - 1) * photosPerPage) ==> toplam 6 fotoğraf ve 3 sayfa varsa; 2. sayfa için 1 ve 2. fotoğraf hariç ilk 2 fotoğrafı göstermesi
        .skip((page - 1) * photosPerPage) // her sayfanın kendi fotoğrafları
        .limit(photosPerPage); // her sayfada gösterilmesi istenen fotoğrafları sınırlama
    res.render('index', {
        photos: photos, // anasayfaya veritabanındaki tüm fotoğrafları gönderme
        current: page, // o anki sayfa
        pages: Math.ceil(totalPhotos / photosPerPage), // toplam sayfa sayısı ve değeri yukarı yuvarlama
    });
};
// ***** //Index sayfası

// ***** Tekil Fotoğraf Sayfası
exports.getPhoto = async (req, res) => {
    // console.log(req.params.id); // body'den fotoğrafın id değerini alma
    const photo = await Photo.findById(req.params.id); // veritabanında id değerine sahip fotoğrafı bulma
    res.render('photo', { photo }); // bulunan fotoğrafı sayfaya gönderme
};
// ***** Tekil Fotoğraf Sayfası

// ***** Fotoğraf Oluşturma
exports.createPhoto = async (req, res) => {
    // console.log(req.files.photoImage);
    // console.log(req.body);

    const uploadDir = 'public/uploads'; // yeni klasör oluşturma ve yolu

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir); // eğer klasör yoksa oluştur
    }

    let uploadedImage = req.files.photoImage; // yüklenen resmi yakalama
    let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name; // resmi klasöre atma
    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body, // body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürme
            image: '/uploads/' + uploadedImage.name, // resim yolu
        });
        res.redirect('/'); // anasayfaya yönlendirme
    });
};
// ***** //Fotoğraf Oluşturma

// ***** Fotoğraf Güncelleme
exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id }); // veriyi yakalama
    photo.title = req.body.title; // title değerini yeni girilen body title değerine eşitleme
    photo.description = req.body.description; // description değerini yeni girilen body içerisindeki description değerine eşitleme
    await photo.save(); // fotoğrafı kaydetme
    res.redirect(`/photos/${req.params.id}`); // ilgili verinin sayfasına gitme
};
// ***** //Fotoğraf Güncelleme

// ***** Fotoğraf Silme
exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id }); // id değerine göre veritabanından bulma
    let deletedImage = __dirname + '/../public' + photo.image; // ilgili resim adresi ve silme
    fs.unlinkSync(deletedImage); // resmi silme
    await Photo.findByIdAndRemove(req.params.id); // id değerine göre veritabanından sile
    res.redirect('/'); // anasayfaya yönlendirme
};
// ***** //Fotoğraf Silme
