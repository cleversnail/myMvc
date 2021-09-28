// 映射数据库中对应的表
const { STRING } = require('sequelize')
module.exports = {
  schema: {
    name: STRING(30)
  },
  options: {
    timestamps: false
  }
}