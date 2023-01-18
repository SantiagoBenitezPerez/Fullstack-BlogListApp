/*  Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created. */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
    test('calls the event handler tha creates a new note', async () => {
        const createBlog = jest.fn()

        render(
            <BlogForm handlePost = {createBlog} />
        )

        const inputs = screen.getAllByRole('textbox')
        const postBtn = screen.getByText('POST BLOG')
        
        await userEvent.type(inputs[0], 'new title')
        await userEvent.type(inputs[1], 'new author')
        await userEvent.type(inputs[2], 'new awesome url')
        await userEvent.click(postBtn)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0]).toEqual(
          {
            title: 'new title',
            author: 'new author',
            url: 'new awesome url'
          })
    })
})