Node.js
=======

1. OT
--

JS  
서버사이드 및 Web에서도 사용할 수 있는 언어이다

Node  
구글이 JS로 만든 V8엔진 + event기반 + Non-blocking IO  
서버사이드로 영역을 확장한 JS



2. 설치
--

* sudo chown 계정이름 디렉토리(. = 현재)  
  * 해당 폴더의 해당 계정으로 sudo 권한 자동 획득  



3. 모듈과 NPM
--

모듈 : 부품(라이브러리)    
nodejs.org에서는 문서에 다 있음  
http method는 require라는 것을 통해서 호출  
listen도 부품

NPM (Node Package Manager) : Node계의 앱스토어 == rails의 gem

* Node.js 모듈 : Http, OS
* JS 모듈 : Date, String, Array

##### JS == Ruby, Node == Rails, NPM == gem   

옵션 값  
  -g : machine에 install, 안쓸 경우 프로젝트에만 install  
  -o : gcc의 o와 같음    
  이름.min : 최소화 됨   
  --save : 해당 Package를 필요로 하게 된다.



4. 콜백 함수  
--  

다른 함수의 파라미터로 호출될 함수   



5. 동기&비동기식 프로그래밍   
--

동기식 : 직접 일처리를 순서대로 하나하나 진행  
비동기식 : 완료 순서에 상관없이 해당 작업을 다른 라이브러리에 할당해서 끝나는 순서대로 실행  

Documents중 method에 sync가 붙으면 동기식, 안붙으면 비동기식(동기식 지양)  



6. Express
--
=> Node의 프레임워크   
supervisor : 동적 서버 자동 restart   

#### 정적 페이지 routing    
require('express')().use(express.static('routing할 폴더이름'));    

## 템플릿 엔진(Jade)   
views (jade 템플릿 폴더)    

## Query String   
=> 전달되는 값

## semantic web
?key=value의 형태가 아닌 key/value 형태의 주소

## form
body-parser라는 middleware가 있어야 post는 받아올 수 있다.



7. 웹앱 제작  
--  


8. 파일 업로드
--
multer : carrierwave의 기능을 가진 npm  

9. Mysql  
--  

접근 순서   
DB Server → DB → tables

mysql 커맨드 옵션 값    
-P : port   
-p : password   
-h : host → 주소  
-u : user → root  

** MySQL 사용시 win10 bash, PowerShell은 사용 불가 **   
** 단 cmd에서는 사용 가능 **  
10. cookie  
--  

cookie-parser : middleware 필요   
cookie-parser에 파라미터로 임의의 key값(아무거나) 넣어서 https방식으로 암호화하는데 사용   

11. session
--    
클라이언트는 오직 id(사용자 식별자)만 저장, 나머지는 다 서버에 저장   
