const Router = require('koa-router');
const authController = require('../controllers/auth');
const router = new Router();

router.post('/login', authController.login);
router.get('/checkAuth', authController.checkAuth);


module.exports = router;