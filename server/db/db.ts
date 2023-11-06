import connection from './connection.ts'
import { Post, PostData, PostUpdate } from '../../models/post.ts'

export function getAllPosts(db = connection) {
  return db('posts').select(
    'id',
    'title',
    'date_created as dateCreated',
    'text'
  )
}

export function addPost(post: Post): Promise<PostData[]> {
  return connection('posts').insert(post).returning('*')
}
