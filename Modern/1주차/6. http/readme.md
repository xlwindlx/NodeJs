## **Server**

#### Method
* listen(port, callback) : 서버 실행    
* close(callback) : 서버 종료   

#### event
* request : 클라이언트 요청 시 발생
* connection : 클라이언트 접속 시 발생
* close : 서버 종료
* checkContinue : 클라이언트가 지속적으로 연결하고 있을 때 발생
* upgrade : 클라이언트가 http 업그레이드를 요청할 때 발생
* clientError : 클라이언트에서 오류가 발생할 때 이벤트

## **response**

#### Method
* writeHead(statusCode, StatusMessage, headers) : 헤더 작성
* end(data, encoding, callback) : 본문 작성
* readFile('파일이름', callback) : File에서 읽어오기

** MIME Type이란? **    
클라이언트에게 전송될 파일의 type을 명시해주는 것   

구조    
<code>part/subpart</code>


#### 쿠키
##### 속성 및 할당
Name = value;   

Expires = 날짜;   
Domain = 도메인;   
Path = 경로;  

#### Http 상태 code

1xx : 처리중   
2xx : 성공    
3xx : redirect    
4xx : 클라이언트 오류    
5xx : 서버 오류   

## **request**

#### 속성
* method : 클라이언트의 요청방식
* url : 클라이언트의 요청 url
* headers : 요청 메시지 헤더
* trailers : 요청 메시지 트레일러
* httpVersion : HTTP프로토콜 버전   
