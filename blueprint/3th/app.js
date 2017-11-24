var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// import multer
var multer = require('multer');
// 파일 크기 제한
var upload = multer({ dest:'./public/uploads', limits:{filesize:1000000, files:1}});

// 홈 컨트롤러 불러오기
var index = require('./server/controllers/index');
// 로그인 컨트롤러 불러오기
var auth = requrie('./server/controllers/auth');
// 코멘트 컨트롤러 불러오기
var comments = require('./server/controllers/comments');
// 비디오 컨트롤러 불러오기
var videos = require('./server/controllers/videos');
// 이미지 컨트롤러 불러오기
var images = require('./server/controllers/images');

// 몽구스 ODM
var mongoose = require('mongoose');
// 세션 저장용 모듈
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// 패스포트와 경고 플래시 메시지 모듈 불러오기
var passport = require('passport');
var flash = require('connect-flash');

var app = express();

// 뷰 엔진 설정
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'ejs');

// DB 설정
var config = require('./server/config/config.js');
// DB 연결
mongoose.connect(config.url);
// 몽고DB 실행 여부 확인
mongoose.connection.on('error', function() {
	console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

// 패스포트 설정
require('./server/config/passport')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
// public 경로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 패스포트용
// 세션용 비밀키
app.use(session({
    secret: 'sometextgohere',
    saveUninitialized: true,
    resave: true,
    // express-session과 connect-mongo를 이용해 몽고DB에 세션 저장
    store: new MongoStore({
        url: config.url,
        collection : 'sessions'
    })
}));

// 패스포트 인증 초기화
app.use(passport.initialize());
// 영구적인 로그인 세션
app.use(passport.session());
// flash messages
app.use(flash());

// Application Routes
// Index Route
app.get('/', index.show);
app.get('/login', auth.signin);
app.post('/login', passport.authenticate('local-login', {
    // 성공시 프로필 페이지로, 실패시 로그인 페이지로
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
}));
app.get('/signup', auth.signup);
app.post('/signup', passport.authenticate('local-signup', {
    // 성공시 프로필 페이지로, 실패시 로그인 페이지로
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
}));

app.get('/profile', auth.isLoggedIn, auth.profile);

// 로그아웃 페이지
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// comments 라우트 설정
app.get('/comments', comments.hasAuthorization, comments.list);
app.post('/comments', comments.hasAuthorization, comments.create);

// 비디오 라우트 설정
app.get('/videos', videos.hasAuthorization, videos.show);
app.post('/videos', videos.hasAuthorization, upload.single('video'), videos.uploadVideo);

// 이미지 라우트 설정
app.post('/images', images.hasAuthorization, upload.single('image'), images.uploadImage);
app.get('/images-gallery', images.hasAuthorization, images.show);


// 404 에러 발생 시 설정
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
