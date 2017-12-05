1. 기본 package 설치
  
  <pre><code>npm install -g yo express express-generator</code></pre>

* npm yo : node뿐만이 아니라 web framework들의 scaffold틀을 만들어주는 npm


2. 프로젝트 생성
  
* express -option project_name

<pre><code>express --ejs --css sass --git blueprint_1th</code></pre>

* Option
  * --ejs : ejs 사용 가능
  * --css <engine> : stylesheet 사용 가능
    * default = css이지만 sass 사용
  * --git : .gitignore 추가
  * --force : 강제로 진행


3. 추가적인 npm
  

* passport : 인증절차에 쓰이는 middleware
* gravatar : 랜덤이미지 표시
* connect-flash : flash자체가 session에 저장되는 메시지, 그걸 깔끔하게 보여줌
* connect-mongo : 몽고DB 연결
* mongoose : 몽구스 ODM - 몽고DB설정
* express-session : DB에 세션 저장
* passport-local : ID/PW 인증

### app 실행방법  

**몽고DB start**  
*sudo service mongodb start*    

#### windows cmd  
<pre><code>set DEBUG=appname:* & npm start</code></pre>

#### bash && shell
<pre><code>DEBUG=appname:* npm start</code></pre>

* 디버그모드 : 서버 실행 시 디버깅 정보 출력
  <pre><code>DEBUG=appname:* </code></pre>

#### bash 단축명령어 등록법

alias 단축명령어 = '원래 커맨드'
<pre><code>alias de = 'DEBUG=blueprint_1th:* npm start'</code></pre>    

![alias](alias.jpg)

### package.json 수동 설치
command로 설치한게 아닌 package.json에 적었을 때
<pre><code>npm install</code></pre>

### 몽고DB 사용법
[공식홈페이지](https://docs.mongodb.com/manual/administration/install-enterprise/)

#### Linux
서버 : sudo apt-get install mongodb-org  

시작 : sudo service mongod start   
종료 : sudo service mongod stop    
재시작 : sudo service mongod restart    

#### windows
[다운로드](https://www.mongodb.com/download-center#enterprise)    
설치 : 그냥 쭈~욱 하기    
서버 셋팅 하기    
    1. mongodb의 기본 dir 생성   
     <code>mkdir c:\data\db</code>   
     * default 폴더 바꾸기   
       <code>"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "원하는 위치"</code>   
    2. 몽고DB 프로젝트 폴더로 이동 후 mongod.exe 실행
     <code>cd C:\Program files\mongodb\server\3.4\bin\mongod.exe</code>
    3. 로그 확인    

### **실행 중 에러**   
* sass revision   
  node버전과 sass버전 호환성 문제   
  sass최신 버전은 node 7.x버전까지만 사용 가능하다.   
  <code>npm rebuild node-sass</code>   

* express-session 버전에 따른 문법 change    
  <code>app.use(cookieParser())</code>    
  <code>app.use(cookieParser('some secret text'))</code>    

### 구성도   
기본적으로 MVC 패턴과 Server쪽만 구성이 되어 있다.   

따라서 Server 폴더에 Model View Controller 이 3가지 폴더와 routes를 구성하는 routes, 그리고 express의 기본 구성 및 module을 설정하는 config폴더로 이루어져 있다.    

    1. config/passport.js : passport-local을 이용하여 로그인 구현    
     apps.js : 모듈 호출   
     model/user.js : 비밀번호 확인    
     routes/index.js : 각 페이지 설정   
     [참조](https://www.zerocho.com/category/NodeJS/post/57b7101ecfbef617003bf457)    

    2. Controller/comments.js   
     댓글만 구현하므로 Controller파일이 하나이다.    
     중간에 render로 direction시키는 부분에서 설정된 문법을 view페이지에서 사용한다.    

    3. Model  
     로그인할 유저 & 댓글이 comments 모델 2가지를 구현    
     NoSQL인 mongodb 형식대로 JSON Type이며 User모델에서는 bcrypt를 사용하여 비밀번호를 암호화한다.    

    4. routes/users.js : user 리스트를 보여줌    
     routes/comments.js : view에서 입력받은 양식들을 model에 넘겨주는 역할 및 설정   
     routes/index.js : app.js와 같은 역할 (about comment CRUD)   
