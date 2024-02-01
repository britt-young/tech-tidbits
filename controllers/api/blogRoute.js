// Require the necessary modules
const router = require('express').Router()
const {Blog} = require('../../models')

// HTTP reqs for CRUD operations
// Create a blog
router.post('/', async (req, res) => {
    try {
        const createBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id
        })
        res.status(200).json(createBlog)
    } catch(err) {
        res.status(400).json(err)
    }
})

// Update a blog
router.put('/:id', async (req, res) => {
    try {
      const updateBlog = await Blog.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      res.status(200).json(updateBlog)
    } catch (err) {
      res.status(400).json(err);
    }
})

// Delete a blog
router.delete('/:id', async (req, res) => {
    try {
      const deleteBlog = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      })
      
      res.status(200).json(deleteBlog)
    } catch (err) {
      res.status(500).json(err)
    }
})

module.exports = router