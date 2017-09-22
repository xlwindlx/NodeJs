var express = require ('Express');
var app = express();
var bodyParser = require('body-parser');
// 서버 실행
app.listen(3000, function() {
  console.log('connected 3000 port!');
});

// get : routing method
app.get('/', function(request, response) {
  response.send('Hello My Page!');
});
app.get('/login', function(request, response) {
  response.send('<h1>Login please!</h1>');
});

// public 폴더로 routing
app.use(express.static('public'));
// 정적 처리 : 서버 restart 필요 X
app.get('/route', function(request, response) {
  response.send('Hello Router, <img src="/route.png">');
});
// 동적 처리 : 서버 restart 필요 O
app.get('/dynamic', function(request, response) {

  var list = '';
  for (var i=0; i<5; i++){
    list = list + '<li>coding</li>';
  }

  var time = Date();
  var output = `
  <!DOCTYPE HTML>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      <h2>hello, dynamic!</h2>
      <ul>
      ${list}
      </ul>
      ${time}
    </body>
  </html>
`;
  response.send(output);
});

app.locals.pretty = true;
// jade 폴더 설정
app.set('views', './views');
// jade로 설정
app.set('view engine', 'jade');
// jade routing 폴더
app.get('/template', function(request, response) {
  response.render('temp', {time:Date(), _title:'Jade template'});
});


// Query String
app.get('/topic', function(request, response) {
  // id 자리가 QueryString key값
  response.send(request.query.id);

  var topics = [
    'JS is...',
    'Node is...',
    'Express is...'
  ];
  var output = `
    <a href = "/topics?id=0">JavaScript</a><br>
    <a href = "/topics?id=1">NodeJs</a><br>
    <a href = "/topics?id=2">Express</a><br><br>
    ${topics[request.query.id]}
  `
  response.send(output);
});

// semantic path
app.get('/topic/:id/:mode', function(request,response) {
  response.send(request.params.id + ' : ' + request.params.mode)
});

// form
app.get('/form', function(request,response) {
  response.render('form');
});

// get
app.get('/form_receiver', function(request, response) {
  var title = request.query.title;
  var des = request.query.description;
  response.send(title + ' : ' + des);
});

// post용 middleware
app.use(bodyParser.urlencoded({ extended: false }));

// post
app.post('/form_receiver', function(request, response) {
  var title = request.body.title;
  var des = request.body.description;
  response.send(title + ' : ' + des);
});
