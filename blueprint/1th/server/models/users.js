// 몽구스와 비밀번호 암호화를 위한 bcrypt load
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// user model 스키마 정의
var userSchema = mongoose.Schema({
  // local Strategy 패스포트용 로컬 키
  local: {
    name: String,
    email: String,
    password: String,
  }
});

// 비밀번호 암호화
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// 비밀번호 유효성 확인
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// user모델 생성하고 앱에 공개(expose)
module.exports = mongoose.model('User', userSchema);
