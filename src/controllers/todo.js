class TodoController {
  async getTodo(ctx) {
    const user = ctx.state.user;
    ctx.body = {
      user,
    };
  };
}

module.exports = new TodoController();