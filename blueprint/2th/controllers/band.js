var models = require('../models/index');
var Band = require('../models/band');

// Create Band
exports.create = function(req, res) {
    // req body를 가진 band 모델 만들기
    models.Band.create(req.body).then(function(band) {
        //res.json(band);
        res.redirect('/bands');
    });
};

// List Bands
exports.list = function(req, res) {
	// Band 전체 목록을 날짜별로 정렬하기
    models.Band.findAll({
        // 최근 생성순으로 정렬
        order: 'createdAt DESC'
    }).then(function(bands) {
        //res.json(bands);
        // 결과 렌더링
        res.render('band-list', {
            title: 'List bands',
            bands: bands
        });
    });
};

// band를 id로 얻기
exports.byId = function(req, res) {
    models.Band.find({
      where: {
        id: req.params.id
      }
  }).then(function(band) {
      res.json(band);
    });
}
// id로 업데이트
exports.update = function (req, res) {
    models.Band.find({
      where: {
        id: req.params.id
      }
  }).then(function(band) {
      if(band){
        band.updateAttributes({
            name: req.body.name,
            description: req.body.description,
            album: req.body.album,
            year: req.body.year,
            UserId: req.body.user_id
        }).then(function(band) {
          res.send(band);
        });
      }
    });
}

// id로 삭제하기
exports.delete = function (req, res) {
    models.Band.destroy({
      where: {
        id: req.params.id
      }
  }).then(function(band) {
      res.json(band);
    });
}
