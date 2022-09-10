const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const ApiRouter = require('./routes/apiRouter');


// ------------- init ------------- //
const app = express();
app.use(cors({
  'origin': '*',
  'methods': 'GET,HEAD,PUT,POST',
}));
app.set('views', path.join(__dirname, 'views'));// view engine setup
app.set('view engine', 'pug');
const server = http.createServer(app);


// ------------- socket ------------- //
const io = socketio(server,{
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
io.on("connection", (socket) => {
  app.set("socket", socket);
  app.set('socketio', io); //allows io object to be accessed by middlewares
});


// ------------- middlewares ------------- //
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => { //security check
  if(!req.rawHeaders.includes(process.env['API_KEY'])) {
    return next(createError(401, 'Unauthorized'));
  }
  next()
})


// ------------- routes ------------- //
const apiRouter = new ApiRouter();
app.use('/api/v1', apiRouter.router);


// ------------- error handling ------------- //
app.use(function(req, res, next) {// catch 404 and forward to error handler
  next(createError(404));
});
app.use(function(err, req, res, next) {// error handler
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));

module.exports = app;
