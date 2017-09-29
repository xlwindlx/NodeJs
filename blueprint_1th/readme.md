1. 기본 package 설치
--
<pre><code>npm install -g yo express express-generator</code></pre>

* npm yo : node뿐만이 아니라 web framework들의 scaffold틀을 만들어주는 npm


2. 프로젝트 생성
--  
* express -option project_name

<pre><code>express --ejs --css sass --git blueprint_1th</code></pre>

* Option
  * --ejs : ejs 사용 가능
  * --css <engine> : stylesheet 사용 가능
    * default = css이지만 sass 사용
  * --git : .gitignore 추가
  * --force : 강제로 진행


7. 추가적인 npm
--

* passport : 인증절차에 쓰이는 middleware
* gravatar : 랜덤이미지 표시
* connect-flash : flash자체가 session에 저장되는 메시지, 그걸 깔끔하게 보여줌
* connect-mongo : 몽고DB 연결
* mongoose : 몽구스 ODM - 몽고DB설정
* express-session : DB에 세션 저장
* passport-local : ID/PW 인증

### app 실행방법  

** 몽고DB start **  
*sudo service mongodb start*    

#### windows cmd  
<pre><code>set DEBUG=appname:* & npm start</code></pre>

#### bash && shell
<pre><code>DEBUG=appname:* npm start</code></pre>

* 디버그모드 : 서버 실행 시 디버깅 정보 출력
<pre><code>DEBUG=appname:* </code></pre>
rr
#### bash 단축명령어 등록법

alias 단축명령어 = '원래 커맨드'
<pre><code>alias de = 'DEBUG=blueprint_1th:* npm start'</code></pre>    

![alias](/alias.jpg)

### package.json 수동 설치
command로 설치한게 아닌 package.json에 적었을 때
<pre><code>npm install</code></pre>

### 몽고DB 사용법
[공식홈페이지](https://docs.mongodb.com/manual/administration/install-enterprise/)

#### Linux
서버 : sudo apt-get install mongodb-server  
클라이언트 : sudo apt-get install mongodb-client

시작 : sudo service mongodb start   
종료 : sudo service mongodb stop    
재시작 : sudo service mongodb restart    

#### windows
[다운로드](https://www.mongodb.com/download-center#enterprise)    
설치 : 그냥 쭈~욱 하기    
서버 셋팅 하기 : ㅠㅠ......   
