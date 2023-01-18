const { favoriteBlog } = require('../utils/list_helper')
const blogs = require('../blogsInfo')

describe('most favorite blog', () => {
    test.only('is found correctly', () => {
        expect(favoriteBlog(blogs)).toEqual(
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                blogs: 5,
                likes: 12,
                __v: 0
              }
        )
    })

    test('is its own value if there is only one', () => {
        let oneBlog = []
        oneBlog.push(blogs[0])
        expect(favoriteBlog(oneBlog)).toEqual(oneBlog[0])
    })

    test('is undefined because there are no blogs', () => {
        expect(favoriteBlog([])).toEqual('there are no blogs')
    })
})