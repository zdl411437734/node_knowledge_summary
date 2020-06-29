var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(80);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

io.on('connection',function (socket) {
  console.log("io connection is run----->");
  console.log('socket--->'+socket.id)
  socket.emit('news',{hello: 'world'});
  socket.on('my other data',function (data) {
    console.log(data);
    // io.emit("online",{key:'就是io.emit'});
    io.emit('broadcast', {b:'aaaa'});
    socket.emit('online',{key:'socket emit'});
    var keys = Object.keys(io.sockets.sockets);
    keys.forEach(element => {
      console.log("==========>"+element);
      io.sockets.sockets[element].emit("online","我是通过id获取之后，进行发送内容的");
      io.sockets.sockets[element].disconnect(true);
    });
    console.log(Object.keys(io.sockets.sockets));
  });
  socket.on('disconnect', () => { console.log('socket is disconnect');});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
