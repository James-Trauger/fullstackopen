import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const UserInfo = () => {
  const id = useParams().id
  const usersInfo = useSelector(({ notification, user, blogs, userInfo }) => userInfo)
  const user = usersInfo.find((user) => id === user.id)

  if (!user) {
    return <p>user not found</p>
  }

  const blogs = user.blogs

  return (
    <div>
      <h2>{user.name}</h2>
      <h2>added blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
