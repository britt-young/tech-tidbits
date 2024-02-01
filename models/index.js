// Import Sequelize models
const User = require('./User.js')
const Blog = require('./Blog.js')
const Comment = require('./Comment.js')

// Define model associations/ relationships
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Blog.belongsTo(User, {
  foreignKey: 'user_id'
})

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

// Export the models
module.exports = {User, Blog, Comment}