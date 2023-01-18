import React, {useState} from 'react'

const BlogForm = ({handlePost}) => {
    const [newBlog, setNewBlog] = useState({
        title: "",
        author: "",
        url: "",
      });

    const getInformation = (e) => {
        return e.target.getAttribute("name") === "title"
          ? setNewBlog({ ...newBlog, title: e.target.value })
          : e.target.getAttribute("name") === "author"
          ? setNewBlog({ ...newBlog, author: e.target.value })
          : e.target.getAttribute("name") === "url"
          ? setNewBlog({ ...newBlog, url: e.target.value })
          : null;
      };

    const createBlog = e => {
        e.preventDefault();
        handlePost(newBlog)
        // setNewBlog("");
    }
    


  return (
    <>
    <h2>Add a New Blog</h2>
    <form>
        <div>
            Title: 
            <input 
            id='title'
            type="text"
            name="title"
            value={newBlog.title}
            onChange={getInformation} />
        </div>
        <div>
            Author: 
            <input 
            id='author'
            type="text"
            name="author"
            value={newBlog.author}
            onChange={getInformation} />
        </div>
        <div>
            Url: 
            <input
            id='url' 
            type="text"
            name="url"
            value={newBlog.url}
            onChange={getInformation} />
        </div>

        <button onClick = {createBlog}>
            POST BLOG
        </button>
    </form>
    </>
  )
}

export default BlogForm