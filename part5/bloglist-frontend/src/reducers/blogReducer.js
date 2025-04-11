import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    incrementLikes(state, action) {
      const id = action.payload
      return state.map((blog) => (blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    appendComment(state, action) {
      const id = action.payload.id
      const comment = action.payload.comment
      return state.map((blog) => (blog.id === id ? { ...blog, comments: blog.comments.concat(comment) } : blog))
    },
  },
})

const { setBlog, appendBlog, incrementLikes, removeBlog, appendComment } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    // like blog on the server
    await blogService.likeBlog({
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(incrementLikes(blog.id))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog)
    dispatch(removeBlog(blog.id))
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    await blogService.commentOnBlog(id, { comment: comment })
    dispatch(appendComment({ id, comment }))
  }
}

export default blogSlice.reducer
