class TodoController {
  async getTodo(ctx) {
    const user = ctx.state.user;
    const io = ctx.io;
    io.emit('message', 'test');
    ctx.body = {
      user,
    };
  };
}

module.exports = new TodoController();
