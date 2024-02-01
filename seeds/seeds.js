// Require the necessary libraries
const sequelize = require('../config/connection')
const {User, Blog} = require('../models')

// Import user data and blog data
const userData = require('./userData.json')
const blogData = require('./blogData.json')

// Seed database
const seedDatabase = async () => {
  await sequelize.sync({force: true})

// Seed users with individual hooks and returns the created instances
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  })

// Seed blogs with random user_id from the created users
  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id
    })
  }
// Exit the script after seeding the database
  process.exit(0)
}

// Call the seedDatabase function
seedDatabase()