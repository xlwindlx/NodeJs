var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.listen(3004, function() {
  console.log('Connected 3004 port!!!');
});

app.use(session({
  secret: 'random value',
  resave: false,
  saveUninitialized: true,
  // session db가 저장될 폴더를 생성함
  store: new MySQLStore({
    host: 'localhost',
    port: 3004,
    user: 'root',
    password: 'ajyabr2368',
    database: 'o2'
  })
}));

// 로그인 form
app.get('/auth/login', function(request, response){
    var output= `
    <h1>Login</h1>
      <form action="/auth/login" method="post">
        <p>
          <input type="text" name="id" placeholder="username"><br>
          <input type="passwd" name="passwd" placeholder="password"><br>
          <input type="submit">
        </p>
      </form>
    `;
    response.send(output);
});

// login
app.post('/auth/login', function(request, response) {
  // 유저 정보 - 일치하지 않으면 에러 표시
  var user = {
    username: '854575',
    password: '12345',
    displayName: 'xlwindlx'
  }
  var username = request.body.username;
  var pwd = request.body.passwd;
  if(username == user.username && pwd == user.passwd) {
    request.session.displayName = user.displayName;
    request.session.save(function() {
      response.redirect('/welcome')
    });
  }
  else {
    response.send('who are you? <a href="/auth/login">login</a>');
  }
});

// logout
app.get('/auth/logout', function(request, response) {
  delete request.session.displayName;
  request.session.save(function() {
    response.redirect('/welcome');
  });
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
      <a href="/auth/login">Login</a>
    `);
  }
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
