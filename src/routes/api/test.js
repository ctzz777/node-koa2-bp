const Router = require('koa-router');
const testController = require('../../controllers/test');
const router = new Router();
const upload = require('../../utils/upload');

router.get('/', testController.testGet);
router.get('/:id', testController.testGetById);
router.post('/', testController.testPost);
router.put('/:id', testController.testPut);
router.delete('/:id', testController.testDelete);
router.post('/upload', upload, testController.testUpload);
router.get('/download/:filename', testController.testDownload);

module.exports = router;