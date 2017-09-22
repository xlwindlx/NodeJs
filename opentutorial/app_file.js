var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

app.listen(3000, function() {
  console.log('Connected, 3000 port!');
});
// 글 작성 form
app.get('/topic/new', function(request, response) {
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      response.status(500).send('Internal Server error');
    }
    response.render('new', {topics:files});
  });
});

// 글을 파일로 작성
app.post('/topic', function(request, response) {
  var title = request.body.title;
  var description = request.body.description;
  fs.writeFile('data/' + title, description, function(err) {
    if(err){
      console.log(err);
      response.status(500).send('Internal Server error');
    }
    response.redirect('/topic/'+title);
  });
});

// 파일에서 글 읽어오기
app.get(['/topic', '/topic/:id'], function(request, response) {
  fs.readdir('data', function(err, files) {
    if(err){
      console.log(err);
      response.status(500).send('Internal Server error');
    }
    var id = request.params.id;
    if(id) {
      // id O
      fs.readFile('data/'+id, 'utf8', function(err, data){
        if(err){
          console.log(err);
          response.status(500).send('Internal Server error');
        }
        response.render('view', {topics:files, title:id, description:data});
      });
    }
    else {
      // id X
        response.render('view', {topics:files, title:'welcome', description:'Hello, JS for Server'});
    }
  });
});

// 본문 내용 표시
// app.get('/topic/:id', function(request, response) {
//   var id = request.params.id;
//
//   fs.readdir('data', function(err, files) {
//     if(err){
//       console.log(err);
//       response.status(500).send('Internal Server error');
//     }
//     fs.readFile('data/'+id, 'utf8', function(err, data){
//       if(err){
//         console.log(err);
//         response.status(500).send('Internal Server error');
//       }
//       response.render('view', {topics:files, title:id, description:data});
//     });
//   });
// });

// 저장될 폴더
var upload = multer({storage: 'uploads/'});

// upload form
app.get('/upload', function(request, response) {
  response.render('upload');
});

// file의 name을 받아오는 파라미터
app.post('/upload', upload.single('userfile'), function(request, response) {
  response.send('uploaded : ' + request.file.filename);
});

// 저장되는 파일 규칙
var storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, 'uploads/')
  },
  filename: function(request, file, callback) {
    callback(null, file.originalname)
  }
});

// 정적 파일 저장
app.use('/user', express.static('uploads'));
