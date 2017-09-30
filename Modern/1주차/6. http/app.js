// 서버 생성
var http = require('http');

// 쿠키 속성 할당
http.createServer(function (request, response) {

  var date = new Date();
  date.setDate(date.getDate() + 7);

  response.writeHead(200,
    {
      'content-type' : 'text/html',
      'Set-Cookie' : ['breakfast = Toast; Expires = ' + date.toUTCString(),
                      'dinner = chicken']
    });
  // 쿠키 출력
  response.end('<h1>'+request.headers.cookie+'</h1>');
// 서버 실행
}).listen(52273, function() {
  console.log('Server Running at http://127.0.0.1:52273');
});;



// 페이지 강제 이동 : Location
http.createServer(function (request, response) {
  response.writeHead(302, { 'Location' : 'http://www.hanbit.co.kr'});
  response.end();
}).listen(52274, function() {
  console.log('Server Running at http://127.0.0.1:52274');
});




// url을 통한 페이지 구분
var fs = require('fs');
var url = require('url');

http.createServer(function (request, response) {
  // 변수 선언
  var pathName = url.parse(request.url).pathName;

  // 페이지 구분
  if (pathName == '/'){
    // Index파일 읽기
    fs.readFile('Index.html', function(error, data) {
      response.writeHead(200, {'content-type' : 'text/html'});
      response.end(data);
    });
  }
  else if(pathName == '/OtherPage'){
    // OtherPage읽기
    fs.readFile('OtherPage.html', function(error, data) {
      response.writeHead(200, {'content-type' : 'text/html'});
      response.end(data);
    });
  }
}).listen(52275, function() {
  console.log('Server Running at http://127.0.0.1:52275');
});



// Method 속성으로 page구분
// var url = require('url');

http.createServer(function (request, response) {
  if (request.method == 'GET') {
    console.log('GET 요청입니다.');
  }
  else if (request.method == 'POST') {
    console.log('POST 요청입니다.');
  }
}).listen(52276, function() {
  console.log('Server Running at http://127.0.0.1:52276');
});



// Get 요청 추출
http.createServer(function (request, response) {

  // 요청 매개변수 추출
  var query = url.parse(request.url, true).query;

  // Get 요청 매개변수 출력
  response.writeHead(200, {'content-type' : 'text/html'});
  // JSON으로 전달된 query값을 string으로 변환
  response.end('<h1>'+JSON.stringify(query)+'</h1>');
}).listen(52277, function() {
  console.log('Server Running at http://127.0.0.1:52277');
});

// POST 요청 추출
http.createServer(function (request, response) {
  request.on('data', function (data) {
    console.log('POST data', data)
  });
}).listen(52278);



// File에서 요청 구별하기
// var fs = require('fs');

http.createServer(function(request, response) {
  if (request.method == 'GET') {
    // GET 요청
    fs.readFile('HTMLPage2.html', function(error, data) {
      response.writeHead(200, { 'content-type' : 'text/html'});
      response.end(data);
    });
  }
  else if (request.method == 'POST') {
    // POST 요청
    request.on('data', function(data) {
      response.writeHead(200, {'content-type' : 'text/html'});
      response.end('<h1>'+data+'</h1>');
    });
  }
}).listen(52279, function () {
  console.log('Server Running at http://127.0.0.1:52279');
});



// 쿠키 추출
http.createServer(function (request, response) {
  // get cookie
  var cookie = request.headers.cookie;

  // set cookie
  response.writeHead(200, {
    'content-type' : 'text/html',
    'Set-Cookie' : ['name = RintIanTta', 'region = Seoul']
  });

  response.end(JSON.stringify(cookie));
}).listen(52280, function () {
  console.log('Server Running at http://127.0.0.1:52280');
});



// 쿠키 분해
http.createServer(function (request, response){
  // 쿠키가 있는지 확인
  if(request.headers.cookie) {
    // 추출 & 분해
    var cookie = request.headers.cookie.split(';').map(function (element) {
      var element = element.split('=');
      return {
        key : element[0],
        value : element[1]
      };
    });
    response.end(JSON.stringify(cookie));
  }
  else {
    // 쿠기 생성
    response.writeHead(200, {
      'content-type' : 'text/html',
      'Set-Cookie' : ['name = RintIanTta', 'region = Seoul']
    });
    response.end('<h1>쿠키를 생성했습니다</h1>');
  }
}).listen(52281, function() {
  console.log('Server Running at http://127.0.0.1:52281');
});
// 서버 종료
// http.close();
