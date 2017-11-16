// get gravatar icon from email
var gravatar = require('gravatar');
// get Comments model
var Comments = require('../models/comments');

// 댓글 목록
exports.list = function(req, res) {
	// 댓글 전체 목록을 날짜별로 정렬하기
  Comments.find().sort('-created').populate('user', 'local.email').exec(function(error, comments) {
    if (error) {
      return res.send(400, {
        message: error
      });
    }
    // Render result
    res.render('comments', {
      title: 'Comments Page',
      comments: comments,
      gravatar: gravatar.url(comments.email ,  {s: '80', r: 'x', d: 'retro'}, true)
    });
  });
};
// 댓글 작성
exports.create = function(req, res) {
	// request body를 가진 댓글 모델 작성하기
  var comments = new Comments(req.body);
  // Set current user (id)
  comments.user = req.user;
  // save the data received
  comments.save(function(error) {
    if (error) {
      return res.send(400, {
        message: error
      });
    }
    // Redirect to comments
    res.redirect('/comments');
  });
};
// 댓글 인증 미들웨어
exports.hasAuthorization = function(req, res, next) {
	if (req.isAuthenticated())
    return next();
  res.redirect('/login');
};
