var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session); // session이란 모듈이 필요
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.listen(3004, function() {
  console.log('Connected 3004 port!!!');
});

//
app.use(session({
  secret: 'random value',
  resave: false,
  saveUninitialized: true,
  // session db가 저장될 폴더를 생성함
  store: new FileStore()
}));

// 유저 정보 - 일치하지 않으면 에러 표시
var users = [
  {
  username: '854575',
  password: '12345',
  displayName: 'xlwindlx'
  }
];

// 로그인 form
app.get('/auth/login', function(request, response){
    var output= `
    <h1>Login</h1>
      <form action="/auth/login" method="post">
        <p>
          <input type="text" name="id" placeholder="username"><br>
          <input type="password" name="password" placeholder="password"><br>
          <input type="submit">
        </p>
      </form>
    `;
    response.send(output);
});

// login
app.post('/auth/login', function(request, response) {
  var username = request.body.username;
  var pwd = request.body.password;
  for (var i=0; i<users.length; i++) {
    var user = users[i];
    if(username === user.username && pwd === user.password) {
      request.session.displayName = user.displayName;
      // return이 즉시 실행
      return request.session.save(function(){
        response.redirect('/welcome');
      });
    }
  }
  response.send('who are you? <a href="/auth/login">login</a>');
});

// logout
app.get('/auth/logout', function(request, response) {
  delete request.session.displayName;
  response.redirect('/welcome');
});

// 로그인 후 페이지
app.get('/welcome', function(request, response) {
  if(request.session.displayName) {
    response.send(`
        <h1> Hello, ${request.session.displayName}</h1>
        <a href="/auth/logout">logout</a>
    `);
  }
  else {
    response.send(`
      <h1>welcome</h1>
      <ul>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/registern">register</a></li>
      </ul>
    `);
  }
});

// 다중 사용자 등록
app.get('/auth/register', function(request, response) {
  var output= `
  <h1>Login</h1>
    <form action="/auth/register" method="post">
      <p>
        <input type="text" name="id" placeholder="username"><br>
        <input type="password" name="password" placeholder="password"><br>
        <input type="text" name="displayName" placeholder="displayName"><br>
        <input type="submit">
      </p>
    </form>
  `;
  response.send(output);
});


// 유저 등록
app.post('/auth/register', function(request, response) {
  var user = {
    username: request.body.username;
    password: request.body.password;
    displayName: request.body.displayName
  };
  users.push(user);
  session.request.displayName = request.body.displayName;
  request.session.save(function(){
    response.redirect('/welcome');
  });
});


// count++
app.get('/count', function(request, response){
  if(request.session.count){
    request.session.count++;
  }
  else{
    request.session.count = 1;
  }
  response.send('count : ' + request.session.count);
});

// session count read
app.get('/temp', function(request, response) {
  response.send('result : '+request.session.count);
});
