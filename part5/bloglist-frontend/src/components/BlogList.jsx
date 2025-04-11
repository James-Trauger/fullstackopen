import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ notification, blogs, user }) => blogs)

  return (
    <div>
      <ul>
        {blogs ? (
          [...blogs]
            .sort((x, y) => y.likes - x.likes)
            .map((blog) => (
              <li key={blog.id}>
                <Link style={{ color: 'white' }} key={blog.id} to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </li>
            ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

export default BlogList
