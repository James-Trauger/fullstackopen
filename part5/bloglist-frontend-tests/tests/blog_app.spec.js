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
    // another user
    request.post('/api/users', {
      data: {
        username: 'grr',
        password: 'martin',
        name: 'George R. R. Martin'
      }
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

    describe('when 1 blog is added', () => {
      const blog = {
        title: 'A Song of Ice and Fire',
        author: 'George R. R. Martin',
        url: 'localhost.com'
      }

      beforeEach(async ({ page }) => {
        await createBlog(page, blog)
      })

      test('a blog can be liked', async ({ page }) => {
        // show details of the blog
        const blogDiv = page.locator('.blog')
        await blogDiv.getByRole('button', { name: 'view' }).click()
        // click the like button
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('a blog can be deleted by the user who created it', async ({ page }) => {
        // show details of the blog
        const blogDiv = page.locator('.blog')
        await blogDiv.getByRole('button', { name: 'view' }).click()
        
        page.on('dialog', dialog => dialog.accept())
        //click delete button
        await blogDiv.getByRole('button', { name: 'delete' }).click()

        await expect(page.locator('.blog')).not.toBeVisible()
      })

      test('a blog\'s delete button is not visible to users who didnt create it', async ({ page }) => {
        // logout as the current user
        page.getByRole('button', { name: 'logout' }).click()
        // login as the new user
        await loginWith(page, 'grr', 'martin')

        // show details of the blog
        const blogDiv = page.locator('.blog')
        await blogDiv.getByRole('button', { name: 'view' }).click()

        await expect(blogDiv.getByRole('button', { name: 'delete' })).not.toBeVisible()
      })

      describe('multiple blogs are added', () => {

        beforeEach(async ({ page }) => {
          // add two more blogs
          await createBlog(page, {
            title: 'A Game of Thrones',
            author: 'George R. Martin',
            url: 'google.com'
          })

          await createBlog(page, {
            title: 'A Clash of Kings',
            author: 'George Martin',
            url: 'blusky.app'
          })

          // like two blogs
          await page.locator('.blog').getByText(/^A Clash of Kings/ ).getByRole('button', { name: 'view' }).click()
          await page.locator('.blog').getByText(/^A Game of Thrones/).getByRole('button', { name: 'view' }).click()
          await page.locator('.blog').getByText(/^A Clash of Kings/).getByRole('button', { name: 'like' }).click()
          await page.locator('.blog').getByText(/^A Game of Thrones/).getByRole('button', { name: 'like' }).click()

          // logout
          await page.getByRole('button', { name: 'logout' }).click()
          // login as a different user
          await loginWith(page, 'grr', 'martin')

          // like 1 blog
          await page.locator('div').filter({ hasText: /^A Game of Thrones/ }).getByRole('button').click()
          await page.locator('div').filter({ hasText: /^A Game of Thrones/ }).getByRole('button', { name: 'like' }).click()

          await page.reload()
        })

        test('multiple blogs are added', async ({ page }) => {
          const blogs = page.locator('.blog')
          await expect(blogs.first()).toHaveText(/^A Game of Thrones/)
          await expect(blogs.last()).toHaveText(/^A Song of Ice and Fire/)
        })
      })
    })
  })
})