/* 1.  Make a test which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default. Add CSS-classes to the component to help the testing as necessary. */

/* 2. Make a test which checks that the blog's url and number of likes are shown when the button controlling the shown details has been clicked. */

/* 3. Make a test which ensures that if the like button is clicked twice, the event handler the component received as props is called twice. */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
    // 1.
    test('renders the blog title and author by default', () => {
        const blog = {
            title: 'newBlog',
            author: 'santibp',
            url: 'https://foo.com',
            likes: 10
        }

        const {container} = render(
            <Blog blog={blog} />
        )

        const defaultViewElement = container.querySelector('.defaultView')

        expect(defaultViewElement).toHaveTextContent(`${blog.title}, ${blog.author}`)
    })

    // 2. 

    test('shows url and likes when view btn is pressed', async () => {
        const blog = {
            title: 'newBlog',
            author: 'santibp',
            url: 'https://foo.com',
            likes: 10
        }

        const {container} = render(
            <Blog blog={blog} />
        )

        const viewBtn = screen.getByText('View')
        await userEvent.click(viewBtn)

        const defaultView = container.querySelector('.defaultView')
        const fullViewElement = container.querySelector('.fullView')

        expect(defaultView).toBeNull()
        expect(fullViewElement).toBeDefined()

    })

    // 3.
    test('event handler of like btn is called twice if button is pressed twice', async () => {
        const blog = {
            title: 'newBlog',
            author: 'santibp',
            url: 'https://foo.com',
            likes: 10
        }

        const handleLike = jest.fn()
        render(
            <Blog blog={blog} handleLike = {handleLike} />
        )

        const showBtn = screen.getByText('View')
        await userEvent.click(showBtn)
        const likeButton = screen.getByText('Like')
        await userEvent.dblClick(likeButton)

        expect(handleLike.mock.calls).toHaveLength(2)
    })
})

