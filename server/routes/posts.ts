import express from 'express'
import * as db from '../db/db'
import { Post } from '../../models/post'
import { redirect, useParams } from 'react-router-dom'

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
// POST a post
router.post('/', async (req, res) => {
  try {
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
// PATCH a post
router.patch('/:id', async (req, res) => {
  try {
    const post = req.body
    const postId = Number(req.params.id)
    const patchPost = await db.patchPost(post, postId)
    if (!patchPost) {
      res.status(400).json({
        message: 'Post was not edited',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while editing the post',
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const post = req.body
    const postId = Number(req.params.id)
    await db.deletePost(post, postId)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while editing the post',
    })
  }
})

export default router
