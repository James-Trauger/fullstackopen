import { prettyDOM, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const blog = {
  title: 'A Title',
  author: 'Leo Tolstoy',
  url: 'google.com',
}

test('blog form submit button calls event handler', async () => {
  const createBlog = vi.fn()

  const container = render(
    <BlogForm
      createBlog={createBlog}
    />
  )
  const user = userEvent.setup()
  const inputs = container.getAllByRole('textbox')
  const titleInput = inputs[0]
  await user.type(titleInput, blog.title)
  const authorInput = inputs[1]
  await user.type(authorInput, blog.author)
  const urlInput = inputs[2]
  await user.type(urlInput, blog.url)

  const button = container.getByText('create')
  await user.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(blog)
})