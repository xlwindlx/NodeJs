var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ajyabr2368',
  database : 'o2'
});

connection.connect();

// // select
// connection.query('SELECT * from topic', function (error, rows, fields) {
//   if (error){ throw error;
//   console.log('The solution is: ', results[0].solution);
//   }
//   else {
//     for(var i=0;i<rows.length;i++){
//       console.log(rows[i].description);
//     }
//   }
// });

// INSERT
// var sql = 'INSERT INTO topic (title, description, author) VALUES (?,?,?)';
// var params = ['Supervisor','Watcher', "graphittie"];
// connection.query(sql, params, function(error, rows, fields) {
//   if(error) {
//     console.log(error);
//   }
//   else {
//     console.log(rows);
//   }
// });

// UPDATE
// var sql = 'UPDATE topic SET= title=? author=? WHERE id=?';
// var params = ['NPM','leezche', 1];
// connection.query(sql, params, function(error, rows, fields) {
//   if(error) {
//     console.log(error);
//   }
//   else {
//     console.log(rows);
//   }
// });

// DELETE
// var sql = 'DELETE FROM topic WHERE id=?';
// var params = [1];
// connection.query(sql, params, function(error, rows, fields) {
//   if(error) {
//     console.log(error);
//   }
//   else {
//     console.log(rows);
//   }
// });

connection.end();
