import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const changeVisibility = () => setShowDetails(!showDetails)

  const blogDetails = () => {
    const style = {
      margin: 0,
      textIndent: 20
    }
    
    return (
      <div style={style}>
        <p style={style}>{blog.url}</p>
        <p style={style}>likes {blog.likes}</p>
        <p style={style}>added by {blog.user.name}</p>
      </div>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={changeVisibility}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails
      ? blogDetails()
      : <></>
      }
    </div>  
)}

export default Blog