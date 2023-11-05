import express from 'express'

const router = express.Router()

// GET all posts
router.get('/', async (req, res) => {
  const id = Number(req.params.id)
})

export default router
