// Require the necessary modules
const router = require('express').Router()
const {User, Comment, Blog} = require('../models')
const withAuth = require('../utlis/auth')

// Homepage route
router.get('/', async (req, res) => {
    try {
      let blogs = await Blog.findAll({
        include: User
    })
    blogs = blogs.map(blog => blog.get({plain: true}))

      res.render('homepage', {
        blogs,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Dashboard route
  router.get('/dashboard', withAuth, async (req, res) => {
    try {
        let blogs = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: User
        })
        blogs = blogs.map(blog => blog.get({plain: true}))
        
        res.render('dashboard', {
            blogs,
            url: req.originalUrl,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// Create a blog route
router.get('/createblog', withAuth, async (req, res) => {
  try {
      let user = await User.findOne({
          where: {
              id: req.session.user_id
          }
      })
      user = user.get({plain: true})
      res.render('createblog', {
          user,
          url: req.originalUrl,
          logged_in: req.session.logged_in
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// Edit a blog route
router.get('/editblog/:id', withAuth, async (req, res) => {
  try {
      let blog = await Blog.findOne({
          where: {
              id: req.params.id
          },
          include: User, Comment
      })
      blog = blog.get({plain: true})
      console.log(blog)
      res.render('editblog', {
          blog,
          url: req.originalUrl,
          logged_in: req.session.logged_in
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// View a blog route
router.get('/blog/:id', async (req, res) => {
  try {
      let blog = await Blog.findOne({
          where: {
              id: req.params.id
          },
          include: [User, Comment]
      })
      blog = blog.get({plain: true})
      
      let comments = await Comment.findAll({
          where: {
              blog_id: req.params.id
          },
          include: [User, Blog]
      })
      comments = comments.map(comment => comment.get({plain: true}))
    
      res.render('blog', {
          blog,
          comments,
          logged_in: req.session.logged_in
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// Login route
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return
    }
  
    res.render('login');
  });

  // Export router for main file usage
  module.exports = router