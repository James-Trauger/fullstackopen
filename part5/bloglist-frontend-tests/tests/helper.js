const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'create' }).click()
      await page.getByTestId('title').fill(blog.title)
      await page.getByTestId('author').fill(blog.author)
      await page.getByTestId('url').fill(blog.url)
      await page.getByRole('button', { name: 'create' }).click()
      const blogDiv = page.locator('.blog')
      await blogDiv.getByText(blog.title).waitFor()
      await blogDiv.getByText(blog.author).waitFor()
}

export { loginWith, createBlog }