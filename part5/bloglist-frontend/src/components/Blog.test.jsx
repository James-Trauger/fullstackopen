import { prettyDOM, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Blog Title',
  author: 'George R. R. Martin',
  url: 'localhost.com',
  likes: 10,
  user: {
    name: 'jtrau',
  },
}

test('renders title and author but not url and likes', () => {
  const mockDelete = vi.fn()
  const mockLike = vi.fn()

  const { container } = render(<Blog blog={blog} deleteHandler={mockDelete} likesHandler={mockLike} />)

  const blogDiv = container.querySelector('.blog')

  expect(blogDiv).toHaveTextContent(blog.title)
  expect(blogDiv).toHaveTextContent(blog.author)
  expect(blogDiv).not.toHaveTextContent(blog.url)
  expect(blogDiv).not.toHaveTextContent('likes')

  // extra details of the blog should not be rendered
  const blogDetailsDiv = container.querySelector('.blogDetails')
  expect(blogDetailsDiv).toBeNull()
})

test('shows url and likes after button click', async () => {
  const mockDelete = vi.fn()
  const mockLike = vi.fn()

  const { container } = render(<Blog blog={blog} deleteHandler={mockDelete} likesHandler={mockLike} />)

  // click the view button
  const button = container.querySelector('.detailsButton')
  expect(button).toBeDefined()
  const user = userEvent.setup()
  await user.click(button)

  const blogDetailsDiv = container.querySelector('.blogDetails')
  expect(blogDetailsDiv).toBeDefined()
  expect(blogDetailsDiv).toHaveTextContent(blog.url)
  expect(blogDetailsDiv).toHaveTextContent(`likes ${blog.likes}`)
})

test('click like button test', async () => {
  const mockDelete = vi.fn()
  const mockLike = vi.fn()

  const { container } = render(<Blog blog={blog} deleteHandler={mockDelete} likesHandler={mockLike} />)

  // click the view button
  const button = container.querySelector('.detailsButton')
  expect(button).toBeDefined()
  const user = userEvent.setup()
  await user.click(button)

  // click the like button
  const likeButton = container.querySelector('.likeButton')
  expect(likeButton).toBeDefined()
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLike.mock.calls).toHaveLength(2)
})
