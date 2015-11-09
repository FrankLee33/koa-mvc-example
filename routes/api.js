var
book1=function *(){
  yield this.render('book1', {
     title: '小可乐'
  });
},
book2=function *(){
  this.body={
        name:'franklee',
        age:28
      };
};
book3=function *(){
   dbpool.query('SELECT * from users').then(function(){
      console.log('ok..');
   }).catch(function(){

   });
};
module.exports = {
  '/api/book1':book1,
  '/api/book2':book2,
  '/api/book3':book3,
};
