var express = require('express');
var router = express.Router();
// 비밀번호 처리를 위한 passport모듈
var passport = require('passport');
// email에서 gravatar 아이콘 추출
var gravatar = require('gravatar');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express from server folder' });
});

/* GET login */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Page', message: req.flash('loginMessage') });
});
/* POST login */
router.post('/login', passport.authenticate('local-login', {
  // 성공하면 프로필 페이지로, 실패하면 로그인페이지로
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

/* GET Signup */
router.get('/signup', function(req, res) {
  res.render('signup', { title: 'Signup Page', message: req.flash('signupMessage') });
});
/* POST Signup */
router.post('/signup', passport.authenticate('local-signup', {
  // 성공하면 프로필 페이지로, 실패하면 가입페이지로
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

/* GET Profile page. */
router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'Profile Page', user : req.user, avatar: gravatar.url(req.user.email ,  {s: '100', r: 'x', d: 'retro'}, true) });
});

/* 로그인 했는지 확인 */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

/* GET Logout Page */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
