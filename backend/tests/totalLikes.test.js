const {totalLikes} = require('../utils/list_helper')
const blogs = require('../blogsInfo')

describe('total likes', () => {
    test('of all blogs is calculated right', () => {
        expect(totalLikes(blogs)).toBe(36)
    })

    test('of one blog (first) is its own value of likes', () => {
        const oneBlog = []
        oneBlog.push(blogs[0])
        expect(totalLikes(oneBlog)).toBe(7)
    })

    test.only('of no blogs is zero', () => {
        expect(totalLikes([])).toBe(0)
    })


})