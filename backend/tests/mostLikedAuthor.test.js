const { mostLikedAuthor } = require('../utils/list_helper')
const blogs = require('../blogsInfo')

describe('most liked author', () => {
    test('is determined correcty', () => {
      expect(mostLikedAuthor(blogs)).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 12
      })
    })
})