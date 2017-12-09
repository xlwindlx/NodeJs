// 패스포트 모듈 로드
var LocalStrategy = require('passport-local').Strategy;
// load up the user model
var User = require('../models/users');

module.exports = function(passport) {
  // passport 초기화 설정
  // 세션을 위해 user 직렬화
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // user 역직렬화
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  // local strategy 사용
  passport.use('local-login', new LocalStrategy({
    // 계정 = email, 비번 = password로 설정
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    if (email)
    // 소문자 처리
    email = email.toLowerCase();
    // 비동기로 처리
    process.nextTick(function() {
      User.findOne({ 'local.email' :  email }, function(err, user) {
        // 에러 발생 시
        if (err)
          return done(err);
        // 에러 체크한 후 메시지 가져오기
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Wohh! Wrong password.'));
        // 다 이상 없으면 user 정보 가져오기
        else
          return done(null, user);
      });
    });
  }));
  // local strategy 등록
  passport.use('local-signup', new LocalStrategy({
      // 계정 = email, 비번 = password로 설정
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, email, password, done) {
    if (email)
    // 소문자로 변환
    email = email.toLowerCase();
    // 비동기로 처리
    process.nextTick(function() {
      // 로그인 전이면
      if (!req.user) {
        User.findOne({ 'local.email' :  email }, function(err, user) {
          // 에러 발생 시
          if (err)
            return done(err);
          // 이메일 중복 확인
          if (user) {
            return done(null, false, req.flash('signupMessage', 'Wohh! the email is already taken.'));
          } else {
            // user 생성
            var newUser = new User();
            // 입력한 user의 name값 가져오기
            newUser.local.name = req.body.name;
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            // 저장
            newUser.save(function(err) {
                if (err)
                  throw err;
                return done(null, newUser);
            });
          }
        });
      } else {
          return done(null, req.user);
      }
    });
  }));
};
