// 홈화면 보여주기
exports.show = function(req, res) {
	// 홤 화면 렌더링
	res.render('index', {
		title: 'Multimedia Application',
		callToAction: 'An easy way to upload and manipulate files with Node.js'
	});
};
