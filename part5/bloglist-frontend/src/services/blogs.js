import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const likeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  
  const request = await axios.put(baseUrl+`/${blog.id}`, blog, config)
  return request.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  
  const request = await axios.delete(baseUrl+`/${blog.id}`, config)
  return request.data
}

export default { getAll, create, setToken, likeBlog, deleteBlog}