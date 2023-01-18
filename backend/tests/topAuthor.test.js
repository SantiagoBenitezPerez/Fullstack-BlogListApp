const { mostBlogs } = require('../utils/list_helper')
const blogs = require('../blogsInfo')

describe('top author', () => {
    test('is determined correcty', () => {
      expect(mostBlogs(blogs)).toEqual({
        author: "Robert C. Martin",
        blogs: 17
      })
    })
})