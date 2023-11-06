import express from 'express'
import * as db from '../db/db'
import { Post } from '../../models/post'

const router = express.Router()

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts: Post = await db.getAllPosts()
    res.json(posts)
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while getting posts',
    })
  }
})

export default router
