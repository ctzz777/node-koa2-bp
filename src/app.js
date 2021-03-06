require('./config/config');
const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const session = require('koa-session');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const path = require('path');
const mongoose = require('./models/index');
const passport = require('./utils/passport');
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/error');
const app = new Koa();
const server = http.createServer(app.callback());
const io = require('./utils/socket')(server);
const staticPath = './public';

app.context.io = io;
app.keys = [process.env.SESSION_KEY];
app.use(logger());
app.use(cors());
app.use(static(path.join(__dirname, staticPath)));
app.use(bodyParser());
app.use(session({}, app));
app.use(errorMiddleware.handleError());
app.use(passport.initialize());
app.use(passport.session());
app.use(router.routes());
app.use(router.allowedMethods());

server.listen(process.env.SERVER_PORT);
