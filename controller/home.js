module.exports = {
  index: async app => {
    // app.ctx.body = await 'Ctrl Index'
    app.ctx.body = await app.$model.user.findOne({ where: { id: '1' } });
  },
  detail: async app => {
    app.ctx.body = 'Ctrl Detail'
  }
}