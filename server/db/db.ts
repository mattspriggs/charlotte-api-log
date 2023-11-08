import connection from './connection.ts'
import { Post, PostData, PostUpdate } from '../../models/post.ts'
import { Comment, CommentData } from '../../models/comment.ts'

// GET
export function getAllPosts(db = connection) {
  return db('posts').select(
    'id',
    'title',
    'date_created as dateCreated',
    'text'
  )
}

// PATCH
export function patchPost(
  post: PostUpdate,
  id: number,
  db = connection
): Promise<Post[]> {
  return db('posts').where('id', id).update(post).returning('*')
}
// POST
export function addPost(post: PostData): Promise<Post[]> {
  const date_created = new Date(Date.now())
  return connection('posts')
    .insert({ ...post, date_created })
    .returning(['id', 'title', 'text'])
}

// DELETE
export function deletePost(post: Post, id: number): void {
  return connection('posts').delete().where('id', id)
}
