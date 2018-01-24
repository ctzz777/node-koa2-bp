const Test = require('../models/test');
const axios = require('axios');
const fs = require('fs');

class TestController {
  async testGet(ctx) {
    const tests = await Test.find({});
    ctx.body = {
      tests,
    };
    console.log(`GET: ${tests}, ip: ${ctx.ip}`);
  };

  async testGetById(ctx) {
    const id = ctx.params.id;
    let test = await Test.findById(id);
    test = test ? test : {};
    ctx.body = {
      test,
    };
    console.log(`GET_BY_ID: ${test}, ip: ${ctx.ip}`);
  };

  async testPost(ctx) {
    const test = await new Test(ctx.request.body).save();
    ctx.body = {
      test,
    };
    console.log(`POST: ${test}, ip: ${ctx.ip}`);
  };

  async testPut(ctx) {
    const id = ctx.params.id;
    const test = await Test.findByIdAndUpdate(id, ctx.request.body, {new: true});
    ctx.body = {
      test,
    };
    console.log(`PUT: ${test}, ip: ${ctx.ip}`);
  };

  async testDelete(ctx) {
    const id = ctx.params.id;
    const test = await Test.findByIdAndRemove(id);
    ctx.body = {
      test,
    };
    console.log(`DELETE: ${test}, ip: ${ctx.ip}`);
  };

  async testUpload(ctx) {
    const file = ctx.req.file;
    const name = ctx.req.body.name;
    ctx.body = {
      file,
      name,
    };
  }

  async testDownload(ctx) {
    const filename = ctx.params.filename;
    const reqConfig = {
      method: 'get',
      url: `http://${ctx.host}/${filename}`,
      responseType: 'stream'
    };
    const response = await axios(reqConfig);
    response.data.pipe(fs.createWriteStream(`src/public/test${filename}`));
    ctx.body = response.data;
  }
}

module.exports = new TestController();