const mongoose = require('mongoose')
const blogs = require('../blogsInfo')
const request = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const api = request(app)

beforeEach( async () => {
    await Blog.deleteMany({})
    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArr = blogObjects.map(blogObj => blogObj.save())
    await Promise.all(promiseArr)
}, 100000)

test('GET // blogs are returned in json format', async () => {
    await api
     .get('/api/blogs')
     .expect(200)
     .expect('Content-Type', /application\/json/)
  
}, 100000)

test('GET // the correct amount of blogs is returned', async () => {
   const response = await api.get('/api/blogs')
   expect(response.body).toHaveLength(6)
}, 100000)

test('blogs have identifier id',async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => expect(blog.id).toBeDefined())

}, 100000)

test('POST // a valid blog is added to the database', async () => {
    let newBlog = {
        title: "new blog testing",
        author: "some author",
        url: "someauthor.com",
        likes: 20
    }

    await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(201)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogs.length + 1)
}, 100000)

test('if likes property of a blog is missing, it will default to zero', async () => {
    let newBlog = {
        title: "new blog with no likes",
        author: "good author",
        url: "goodauthor.com"
    }

    await api
     .post('/api/blogs')
     .send(newBlog)

    const response = await api.get('/api/blogs')
    response.body.map(blog => expect(blog.likes).toBeDefined())
})

test('server should respond with status code 400 if title or url is missing', async () => {
    let newBlog = { 
        author: "random author",
        url: "http://example.com",
        likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
}, 100000)

test('DELETE // blog with valid ID is deleted successfully', async () => {
   const response = await api.get('/api/blogs')
   const blogToDelete = response.body[0]

   await api
     .delete(`/api/blogs/${blogToDelete.id}`)
     .expect(204)

   
   const requestForBlogs = await api.get('/api/blogs')
   expect(requestForBlogs.body).toHaveLength(blogs.length-1)
   

}, 100000)

test.only('PUT // a blogs likes are updated successfully', async () => {
   const response = await api.get('/api/blogs')
   const noteToUpdate = response.body[0]

   const newNote = {...noteToUpdate, likes: 120}

   await api
     .put(`/api/blogs/${noteToUpdate.id}`)
     .send(newNote)

   const newBlogsResponse = await api.get('/api/blogs')

   const likes = newBlogsResponse.body.map(blog => blog.likes)

   expect(likes).toContain(120)
   

}, 100000)

afterAll(() => {
    mongoose.connection.close()
})