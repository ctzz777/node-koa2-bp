const Router = require('koa-router');
const todoRouter = require('./todo');
const testRouter = require('./test');
const router = new Router();

router.use('/todo', todoRouter.routes(), todoRouter.allowedMethods());
router.use('/test', testRouter.routes(), testRouter.allowedMethods());

module.exports = router;
