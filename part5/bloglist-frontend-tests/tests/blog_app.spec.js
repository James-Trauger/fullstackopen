const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  
  // test user
  const user = {
    name: 'James',
    username: 'jtrau',
    password: '123'
  }
  
  beforeEach(async ({ page, request }) => {
    // empty db
    request.post('/api/testing/reset')
    // add user
    request.post('/api/users', {
      data: { ...user }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, user.username, user.password)

      await expect(page.getByText(`${user.name} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, user.username, `wrong ${user.password}`)

      await expect(page.getByText(`${user.name} logged in`)).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user.username, user.password)
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = {
        title: 'A Song of Ice and Fire',
        author: 'George R. R. Martin',
        url: 'localhost.com'
      }
      
      await createBlog(page, blog)

      await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
    })
  })
})