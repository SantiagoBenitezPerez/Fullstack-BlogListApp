import {useState} from 'react'

const Blog = ({blog, handleLike, handleDelete}) => {
  const [view, setView] = useState(false)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const listStyle = {
    listStyle: 'none'
  }

  const addLike = async () => {

     let updatedBlog = {
      ...blog,
      likes:blog.likes+1
     }
   
     handleLike(blog.id, updatedBlog)
  }

  const deletePost = async () => {
    if(!window.confirm(`Delete ${blog.title} by ${blog.author}?`)) return
    handleDelete(blog.id)
  }

  return (
    <>
    {view ? (
      <div className = 'fullView' style = {blogStyle}>
       
        <div style = {{display:'flex', flexDirection:'column', alignItems: 'center'}}>
         <ul style = {listStyle}>
          <li>Title: {blog.title}</li>
          <li>Author: {blog.author}</li>
          <li>Url: {blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={addLike}>Like</button></li>
         </ul>
         <button 
         style = {{width: '80px', height: '35px'}}
         onClick={deletePost}>
          Remove Post
         </button>
        </div>  
        <button onClick = {() => setView(!view)}>Hide</button>
        
      </div> 
    ) 
    : (
    <div className = 'defaultView' style = {blogStyle}>
      <li style = {listStyle}>{blog.title}, {blog.author} 
      <button onClick = {() => setView(!view)}>View</button>
      <button onClick={deletePost}>Delete</button>
      </li>
    </div> 
       )}

    
    </> 
  )

}



export default Blog