var
path = require('path'),
fs = require('fs'),
koa = require('koa'),
views = require('koa-views'),
kstatic = require('koa-static'),
route = require('koa-route'),
logger = require('koa-logger'),
jsonp = require('koa-jsonp'),
mysql = require('mysql'),
co = require('co'),
wrapper = require('co-mysql'),
cors = require('koa-cors');

var app = module.exports = koa();

//加载jsonp插件
app.use(jsonp());
//加载logger插件
app.use(logger());
//加载cors插件
app.use(cors());
//加载视图插件
app.use(views('views', {
  map: {
    html: 'swig'
  }
}));

//设置公共访问目录
app.use(kstatic(__dirname + '/public'));


// 修改数据库连接地址
global.dbpool = mysql.createPool({
    host : 'localhost',
    port : 3306 ,
    database : 'test',
    user: 'root',
    password : ''
});



//导入路由文件
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
  if(file[0] === '.') return;
  var cs=require(routesPath + '/' + file);
  for(var lab in cs){
    app.use(route.get(lab, cs[lab]));
  }
});


//设置 500错误 和 404错误
app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});
app.use(function *(){
    var err = new Error();
    err.status = 404;
    yield this.render('404', {
       errors: err
    });
});


/******************************************************
 * Start server
 ******************************************************/
if (!module.parent) {
  var port = process.env.PORT ||  9001;
  app.listen(port);
  console.log('Running : http://localhost:%d',  port);
}
