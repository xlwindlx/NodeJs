var _ = require ('underscore');
var arr = [3,6,9,1,12];

// 기본적인 방법
console.log(arr[0]);
// underscore를 사용했을 때 방법
console.log(_.first(arr));

console.log(arr[arr.length-1]);
console.log(_.last(arr));
