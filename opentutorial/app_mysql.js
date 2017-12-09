var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.locals.pretty = true;
app.set('views', './views_mysql');
app.set('view engine', 'jade');

app.listen(3000, function() {
  console.log('Connected, 3000 port!');
});

// DB Connect
var mysql      = require('mysql'); var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ajyabr2368',
  database : 'o2'
});

connection.connect();

// DB추가
app.post('/topic/add', function(request, response) {
  var title = request.body.title;
  var description = request.body.description;
  var author = request.body.author;
  var sql = 'INSERT INTO topic (title, description, author) VALUES (?,?,?)';
  connection.query(sql, [title, description, author], function(err, result, fields) {
    if(err){
      console.log(err);
      response.status(500).send('Internal Server error');
    }
    else {
      response.redirect('/topic/'+result.insertId);
    }
  });
});
// DB 추가
app.get('/topic/add', function(request, response) {
  var sql = 'SELECT id,title FROM topic';
  connection.query(sql, function(err, topics, fields) {
    if(err){
         console.log(err);
         response.status(500).send('Internal Server error');
       }

    response.render('add', {topics:topics});
  });
});

// DB에서 글 읽어오기
app.get(['/topic', '/topic/:id'], function(request, response) {
  var sql = 'SELECT id,title FROM topic';
  connection.query(sql, function(err, topics, fields) {
    var id = request.params.id;
    if(id) {
        var sql = 'SELECT * fROM topic WHERE id=?';
        connection.query(sql, [id], function(err, topic, fields) {
          if(err){
            console.log(err);
            response.status(500).send('Internal Server error');
          }
          else {
            response.render('view', {topics:topics, topic:topic[0]});
          }
        });
    }
    else {
        response.render('view', {topics:topics});
    }
  });
});

// DB 수정
app.get(['/topic/:id/edit'], function(request, response) {
  var sql = 'SELECT id,title FROM topic';
  connection.query(sql, function(err, topics, fields) {
    var id = request.params.id;
    if(id) {
        var sql = 'SELECT * fROM topic WHERE id=?';
        connection.query(sql, [id], function(err, topic, fields) {
          if(err){
            console.log(err);
            response.status(500).send('Internal Server error');
          }
          else {
            response.render('edit', {topics:topics, topic:topic[0]});
          }
        });
    }
    else {
        console.log('There is no id.');
        response.status(500).send('Internal Server error');
    }
  });
});
// DB수정
app.post(['/topic/:id/edit'], function(request, response) {
  var title = request.body.title;
  var description = request.body.description;
  var author = request.body.author;
  var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
  connection.query(sql, [title, description, author, id], function(err, result, fields) {
    if(err){
      console.log(err);
      response.status(500).send('Internal Server error');
    }
    else {
      response.redirect('topic/'+id);
  });
});

// DB삭제
app.get('/topic/:id/delete', function(request, response) {
  var sql='SELECT id,title FROM topic';
  var id = request.params.id;
  connection.query(sql, function(err, topics, fields) {
    var sql='SELECT * FROM topic WHERE id=?';
    connection.query(sql, [id], function(err, topic){
      if(err){
        console.log(err);
        response.status(500).send('Internal Server error');
      }
      else {
        if(topic.length == 0) {
          console.log('There is no record.');
          response.status(500).send('Internal Server error');
        }
        else {
          response.render('delete', {topics:topics, topic:topic[0]});
        }
      }
    });
  });
});
app.post('/topic/:id/delete', function(request, response){
  var id = request.params.id;
  var sql = 'DELETE FROM topic WHERE id=?';
  connection.query(sql, [id], function(err, result){
    response.redirect('/topic/');
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

// connection.end();
