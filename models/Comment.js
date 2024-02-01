// Require the necessary modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define comment model
class Comment extends Model {}

// Set up fields and rules for comment model (initializes the comment table)
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'comment'
  }
)

module.exports = Comment