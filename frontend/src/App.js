import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import request from "./services/login";

const App = () => {
  // state
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  

  // ref
  const BlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    });
  }, []);


  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(
      `logged in with username: ${username} and password: ${password}`
    );

    const credentials = {
      username,
      password,
    };

    // login request
    try {
      const user = await request.login(credentials);

      setUser(user);
      blogService.setToken(user.token);

      setMessage(`Welcome ${user.name}!`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    } catch (exception) {
      setMessage(`${exception.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");

    setUser(null);
    setMessage(`logging out...`);
    setTimeout(() => {
      setMessage(null);
    }, 1000);
  };

 
  const handlePost = async (newBlog) => {

    try {
      const addedBlog = await blogService.postBlog(newBlog);
      setBlogs(blogs.concat(addedBlog));
      setMessage("blog added");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      
      
    } catch (exception) {
      setMessage(`${exception.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

    BlogFormRef.current.toggleVisibility()
  };

  const handleLike = async (id, updatedBlog) => {
    try {
      const updated = await blogService.updateBlog(id, updatedBlog) // returns the updated blog
      const blogToUpdate = blogs.find(blog => blog.id === updated.id)
      const newBlogs = [...blogs]
      newBlogs.splice(newBlogs.indexOf(blogToUpdate),1,updated)
      setBlogs(newBlogs)

     } catch(exception) {
      setMessage(`${exception.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
     }
  }

  const handleDelete = async id => {
    console.log("this is id", id)
    try {
      
      await blogService.deleteBlog(id)
      const updatedBlogs = blogs.filter(blog => blog.id !== id)
      setBlogs(updatedBlogs)
      setMessage('blog deleted successfully');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch(exception) {
      setMessage(`${exception.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }

  return (
    <>
      <Notification message={message} />

      <h1>Blog List</h1>

      {user === null ? (
        <form id='loginForm'>
          <div>
            username:
            <input
              id='username'
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:
            <input
            id='password'
              type="text"
              value={password}
              name="password"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
          </div>

          <button type="submit" onClick={handleLogin}>
            LOG IN
          </button>
        </form>
      ) : (
        <>
          <div>
            <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '270px'}}>
            <h3 id='userStatus'>{user.name} logged in</h3>
            <button style = {{border:'none', height: '25px'}} onClick={handleLogout}>LOG OUT</button>
            </div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog 
              key={blog.id} 
              blog={blog} 
              handleLike = {handleLike}
              handleDelete = {handleDelete}/>
            ))}
          </div>

          <Togglable 
          label = 'POST A NEW BLOG'
          ref = {BlogFormRef}>
          <BlogForm
          handlePost={handlePost}
          />
          </Togglable>          
        </>
      )}
    </>
  );
};

export default App;
