import express from 'express'
import * as db from '../db/db'
import { Post } from '../../models/post'
import { redirect } from 'react-router-dom'

const router = express.Router()

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts: Post = await db.getAllPosts()
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while getting posts',
    })
  }
})

// Post a post
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const post = req.body
    const newPost = await db.addPost(post)
    if (!newPost) {
      res.status(400).json({
        message: 'Post was not added',
      })
      res.status(201).json(newPost)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while adding the post',
    })
  }
})
export default router
