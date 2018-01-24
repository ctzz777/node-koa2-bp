const multer = require('koa-multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(__dirname);
    cb(null, 'src/public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.name}${path.extname(file.originalname)}`);
  }
});
const upload = multer({storage: storage}).single('file');

module.exports = upload;