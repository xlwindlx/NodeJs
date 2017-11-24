// 모듈 불러오기
var fs = require('fs');
var mime = require('mime');
// 메일에서 gravatar 아이콘 추출
var gravatar = require('gravatar');

var Images = require('../models/images');
// 파일 형식 설정
var IMAGE_TYPES = ['image/jpeg','image/jpg', 'image/png'];

// 갤러리 보여주기
exports.show = function (req, res) {

    Images.find().sort('-created').populate('user', 'local.email').exec(function(error, images) {
        if (error) {
            return res.status(400).send({
                message: error
            });
        }
        // 갤러리 렌더링
        res.render('images-gallery', {
            title: 'Images Gallery',
            images: images,
            gravatar: gravatar.url(images.email ,  {s: '80', r: 'x', d: 'retro'}, true)
        });
    });
};

// 이미지 업로드
exports.uploadImage = function(req, res) {
    var src;
    var dest;
    var targetPath;
    var targetName;
    var tempPath = req.file.path;
    console.log(req.file);
    //get the mime type of the file
    var type = mime.lookup(req.file.mimetype);
    // get file extension
    var extension = req.file.path.split(/[. ]+/).pop();
    // check support file types
    if (IMAGE_TYPES.indexOf(type) == -1) {
        return res.status(415).send('Supported image formats: jpeg, jpg, jpe, png.');
    }
    // Set new path to images
    targetPath = './public/images/' + req.file.originalname;
    // using read stream API to read file
    src = fs.createReadStream(tempPath);
    // using a write stream API to write file
    dest = fs.createWriteStream(targetPath);
    src.pipe(dest);

    // Show error
    src.on('error', function(err) {
        if (err) {
            return res.status(500).send({
                message: error
            });
        }
    });

    // Save file process
    src.on('end', function() {
        // create a new instance of the Images model with request body
        var image = new Images(req.body);
        // Set the image file name
        image.imageName = req.file.originalname;
        // Set current user (id)
        image.user = req.user;
        // save the data received
        image.save(function(error) {
            if (error) {
                return res.status(400).send({
                    message: error
                });
            }
        });
        // remove from temp folder
        fs.unlink(tempPath, function(err) {
            if (err) {
                return res.status(500).send('Woh, something bad happened here');
            }
            // Redirect to galley's page
            res.redirect('images-gallery');

        });
    });
};

// Images authorization middleware
exports.hasAuthorization = function(req, res, next) {
    if (req.isAuthenticated())
    return next();
    res.redirect('/login');
};
