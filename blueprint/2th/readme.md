### MySQL 설치 및 실행법
  * windows
    * 설치 : MySQL 홈페이지의 Windows용 installer로 선택적 설치
    * 실행 : 따로 실행할 필요 없음

  * Ubuntu
    * 설치 : <code> sudo apt-get install mysql-server mysql-client</code>
    * 실행 : <code> sudo service mysql start</code>
    * 중지 : <code> sudo sevice mysql stop</code>

  * Mac
    * MySQL 홈페이지의 Mac용 installer로 설치    
      [참조](http://palpit.tistory.com/871)


### Swig Template

JS Template 엔진으로 Django, Jinja2, and Twig 등에서 사용할 수 있다.
> 참조    
[Docs](http://node-swig.github.io/swig-templates/docs/)   
[Github](https://github.com/paularmstrong/swig)   

### Sequelize 미들웨어

Node.js 기반의 ORM으로 PostgreSQL, MySQL, MariaDB, SQLite, MS-SQL을 지원한다.   

가장 큰 특징은 Promise를 기본으로 동작한다는 것이다. Promise는 Promise/A+ 로 불리는 spec에 따라 정의된 비동기작업 제어방식이다. ES6에는 native로 Promise가 포함되었다.

Promise의 장점은 다음과 같다.

복잡한 비동기 코드를 깔끔하고 쉽게 만들 수 있는 방법을 제공한다.
Chaining 을 통해 값을 전달하거나 연속된 일련의 작업을 처리할 수 있다.
Error handling에 대한 처리를 깔끔하게 할 수 있다.
Promise를 구현한 라이브러리에는 대표적으로 Q, RSVP, bluebird가 있다. Sequelize는 이중에서도 bluebird 라이브러리를 살짝 수정한 버전을 사용하고 있다. Promise를 비동기작업을 제어하는 방식으로 사용하는 만큼 Promise에 대해 알고 있는 부분이 많다면 Sequelize의 이용도 한결 수월해진다.

* 설치
  <pre><code>npm install sequelize</code></pre>
  >MySQL을 기본적으로 포함하지 않고 있으므로 따로 설치해주어야한다.
  <pre><code>npm install mysql2</code></pre>
  > 참조    
  [Docs](http://docs.sequelizejs.com/)    
  [ExpressJS에서 ORM인 Sequelize 사용하기](http://webframeworks.kr/tutorials/expressjs/expressjs_orm_one/)    


### ODM(Mongoose) vs ORM(Sequelize)

1. ORM이란?   
Object Relational Mapping으로 App과 DB를 Mapping시켜주는 도구이다.
한층더 추상화된 layer에서 Database에 대한 작업을 할 수 있게 해준다. ORM을 사용함으로써 얻는 장단점(pros and cons)은 다음과 같다.

  * Pros of ORM   
  특정 DBMS에 종속되지 않는다.
  SQL문이 코드에 들어가지 않아 깔끔한 코드를 유지할 수 있다.
  ORM이 nesting데이터를 바인딩해준다.

  * Conf of ORM   
  RAW query에 비해 performance가 느리다.
  Query tuning이 힘들다.
  서비스가 복잡해 질수록 ORM으로 할 수 있는 작업의 범위에 한계가 있다.
    > 참조    
    [Wiki](https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4_%EA%B4%80%EA%B3%84_%EB%A7%A4%ED%95%91)


2. ODM(Object Data Mapping)?    
ODM을 사용하면 코드의 개체와 필요한 경우 데이터의 document 표현간에 변환 할 수 있습니다.    
JSONB는 MongoDB에서 사용하는 JSON 표기법 문서를 이진으로 저장한 형식을 말합니다.   
mongoose는 자바의 JPA/Hibernate/Mybatis와 같은 OR Mapper와 같은 개념입니다.    
또한 객체 표기법을 Document 표기법으로 변환하기 위해 JSON 또는 JSONB API를 사용합니다.    
ORM은 객체 지향 프로그래밍 언어를 사용하여 호환되지 않는 유형 시스템간에 데이터를 변환하는 프로그래밍 기술입니다.    
    > 참조    
    [ODM vs ORM](http://www.polarglow.com/tag/odm-%EA%B3%BC-orm-%EC%B0%A8%EC%9D%B4/)    
    [StackOverFlow](https://stackoverflow.com/questions/12261866/what-is-the-difference-between-an-orm-and-an-odm)



### **Insert Error(DB)**
