const logger = require('../utils/logger').getLogger('error');

const handleError = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      logger.error(err.stack);
      // ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  };
};

module.exports = {
  handleError,
};
