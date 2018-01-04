const passport = require('koa-passport');

class AuthController {
  async login(ctx) {
    return passport.authenticate('local',
      (err, user, info, status) => {
        if (user) {
          const username = user.username;
          const token = user.generateToken();
          ctx.body = {
            username,
            token,
          };
        } else {
          ctx.throw(401);
        }
      })(ctx);
  }
  
  async checkAuth(ctx) {
    ctx.body = {
      auth: ctx.isAuthenticated(), 
      userName: ctx.state.user ? ctx.state.user.username : null
    };
  }
}

module.exports = new AuthController();