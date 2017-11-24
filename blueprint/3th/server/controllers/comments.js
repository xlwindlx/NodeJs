// 메일에서 gravatar 아이콘 추출
var gravatar = require('gravatar');
// 댓글 모델 얻기
var Comments = require('../models/comments');

// 댓글 리스트
exports.list = function(req, res) {
	// 모든 댓글 날짜순으로 정렬
    Comments.find().sort('-created').populate('user', 'local.email').exec(function(error, comments) {
        if (error) {
            return res.send(400, {
                message: error
            });
        }
        // 결과 render
        res.render('comments', {
            title: 'Comments Page',
            comments: comments,
            gravatar: gravatar.url(comments.email ,  {s: '80', r: 'x', d: 'retro'}, true)
        });
    });
};
// Create Comments
exports.create = function(req, res) {
	// create a new instance of the Comments model with request body
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
// Comments authorization middleware
exports.hasAuthorization = function(req, res, next) {
	if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};
