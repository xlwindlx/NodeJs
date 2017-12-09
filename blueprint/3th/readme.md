### 환경별 셋팅 방법 (dev, production, test)
NODE_ENV를 설정하는 것으로 Express 3.x까지는 app.configure()로 쓰였다가 Express 4.x부터는 문법이 바뀌었다.
```js
    // Express 3.x
    app.configure('development', function() {
    // configure stuff here
    });

    // Express 4.x
    var env = process.env.NODE_ENV || 'development';
    if ('development' == env) {
    // configure stuff here
    }
```


### BSON(Binary JSON)
JSON을 Binary data, 즉 컴퓨터가 이해 할 수 있는 16진수 데이터로 변환한 것을 말하며, 최초로 몽고DB에서 도입하였다.

> 참조        
[BSON](http://ohgyun.com/421)       
[Wiki](https://en.wikipedia.org/wiki/BSON)      

#### FS stream API

Node.js에서 파일을 read/write할 때 쓰는 API