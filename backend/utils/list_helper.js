const dummy = blogsArr => {
    return 1
}

const totalLikes = blogsArray => {
    return blogsArray.reduce((current, blog) => current + blog.likes, 0)
  }

const favoriteBlog = blogsArray => {
    if(blogsArray.length === 0) {
        return 'there are no blogs'
    }
    else {
        let mostLikes = Math.max(...blogsArray.map(blog => blog.likes))
        const favorite = blogsArray.find(blog => blog.likes === mostLikes)
        return favorite
    }

}

const mostBlogs = blogsArray => {
    let most_blogs = Math.max(...blogsArray.map(blog => blog.blogs))
    let topAuthor = blogsArray.find(blog => blog.blogs === most_blogs)
    return { author: topAuthor.author, blogs: topAuthor.blogs }
}

const mostLikedAuthor = blogsArray => {
    let mostLikes = Math.max(...blogsArray.map(blog => blog.likes))
    let topAuthor = blogsArray.find(blog => blog.likes === mostLikes)
    return { author: topAuthor.author, likes: topAuthor.likes }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikedAuthor
}