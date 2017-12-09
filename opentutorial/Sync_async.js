var fs = require ('fs');

// 동기적 방식
console.log(1);
var data = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(data);


// 비동기 방식
console.log(2);
fs.readFile('data.txt', {encoding:'utf8'}, function(err, data) {
  // 여기서의 익명함수는 callback으로 비동기식이라 시간이 걸려서 나중에 실행됨
  console.log(3);
  console.log(data);
});
console.log(4);
