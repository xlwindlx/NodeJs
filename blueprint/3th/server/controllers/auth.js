// 메일에서 gravatar 아이콘 추출
var gravatar = require('gravatar');
var passport = require('passport');

// get용 로그인 페이지
exports.signin = function(req, res) {
    // 사용자 전체 목록을 날짜별로 정렬
    res.render('login', { title: 'Login Page', message: req.flash('loginMessage') });
};
// get용 로그아웃 페이지
exports.signup = function(req, res) {
    // 사용자 전체 목록을 날짜별로 정렬
    res.render('signup', { title: 'Signup Page', message: req.flash('signupMessage') });

};
// get용 프로필 페이지
exports.profile = function(req, res) {
    // 사용자 전체 목록을 날짜별로 정렬
    res.render('profile', { title: 'Profile Page', user : req.user, avatar: gravatar.url(req.user.email ,  {s: '100', r: 'x', d: 'retro'}, true) });
};


// 로그아웃 함수
exports.logout = function () {
    req.logout();
    res.redirect('/');
};

// 사용자 로그인 여부 확인
exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};
