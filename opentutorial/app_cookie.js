var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
// asfdw2erqorji : key값
app.user(cookieParser('asdfqwerzxcv'));
app.listen(3003, function() {
  console.log('Connected 3003 port!!!');
});

// Cart
var products = {
  1: {title:'The history of web 1'},
  2: {title: 'The next Web'}
};
app.get('/products', function(request, response){
  var output = '';
  for(var name in products) {
    output +=
     `<li>
        <a href="/cart/${name}">${products[name].title}</a>
     </li>`
  }
  response.send(`<h1>products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});

// cart/:id 생성
/*
  cart = {
  id : 갯수,
  2 : 갯수...
}
*/
app.get('/cart/:id', function(request, response){
  var id = request.params.id;
  if (request.signedCookies.cart) {
    var cart = request.signedCookies.cart;
  }
  else {
    var cart = {};
  }
  if(!cart[id]){
    cart[id]=0; // 없는걸 요청했으니 새로 만들어서 0으로 초기화
  }
  cart[id] = parseInt(cart[id])+1;
  response.cookie('cart', cart, {signed:true});
  response.redirect('/cart');
});

// cart/:id페이지 설정
app.get('/cart/:id', function(request, response){
  var cart = request.cookies.cart;
  if(!cart){
    response.send('Empty!');
  }
  else {
    var output = '';
    for(var name in cart){
      output += `<li>${products[id].title} (${cart[id]})</li>`;
    }
  }
  response.send(`
    <h3>Cart</h3>
    <ul>${output}</ul>
    <a href="/products">Products List</a>`);
});

// count 증가
app.get('/count', function(request, response){
  if(request.signedCookies.count){
    var count = parseInt(request.signedCookies.count);
  }
  else {
    var count = 0;
  }
  count = count + 1;
  response.cookie('count', count, {signed:true});
  response.send('count : '+ count);
});
