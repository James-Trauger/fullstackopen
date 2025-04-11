import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('set blogs to a list', () => {
    const blogs = [
      {
        title: 'title 1',
        author: 'author 1',
        url: 'localhost.com',
      },
      {
        title: 'title 2',
        author: 'author 2',
        url: 'localhost.com',
      },
    ]

    const initialState = []
    const action = {
      type: 'blogs/setBlog',
      payload: blogs,
    }

    deepFreeze(initialState)
    const newState = blogReducer(initialState, action)

    expect(newState).toHaveLength(2)
    expect(newState[0]).toEqual(blogs[0])
    expect(newState[1]).toEqual(blogs[1])

    deepFreeze(newState)
    const emptyState = blogReducer(newState, {
      type: 'blogs/setBlog',
      payload: [],
    })

    expect(emptyState).toHaveLength(0)
    expect(emptyState).toEqual([])
  })

  test('add a single blog', () => {
    const blog = {
      title: 'A Title',
      author: 'An Author',
      url: 'localhost.com',
    }

    const initialState = []
    const action = {
      type: 'blogs/appendBlog',
      payload: blog,
    }

    deepFreeze(initialState)
    const newState = blogReducer([], action)
    expect(newState).toHaveLength(1)
    expect(newState[0]).toEqual(blog)
  })

  describe('when a single blog is added', () => {
    let initialState
    const initialBlog = {
      title: 'A Title',
      author: 'An Author',
      url: 'localhost.com',
      likes: 0,
      id: 0,
    }

    beforeEach(() => {
      initialState = blogReducer([], {
        type: 'blogs/appendBlog',
        payload: initialBlog,
      })
    })

    test('like blog', () => {
      const newState = blogReducer(initialState, {
        type: 'blogs/incrementLikes',
        payload: initialBlog.id,
      })

      expect(newState).toHaveLength(1)
      expect(newState[0].likes).toEqual(initialBlog.likes + 1)
    })

    test('delete a blog', () => {
      const newState = blogReducer(initialState, {
        type: 'blogs/removeBlog',
        payload: initialBlog.id,
      })

      expect(newState).toHaveLength(0)
      expect(newState).toEqual([])
    })
  })
})
