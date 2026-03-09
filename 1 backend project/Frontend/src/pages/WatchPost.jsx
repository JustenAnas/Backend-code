import { useEffect, useState } from "react"
import axios from "axios"
 
const WatchPost = () => {

    const [post, setPost] = useState([
        {
            _id:"1",
            image:"https://images.unsplash.com/photo-1770297345796-8de4cf924c08?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption: "Testing_Caption",
        }
    ])

    useEffect(() => {
       
    axios.get("http://localhost:3000/watch-post/").then((res)=>{

       setPost(res.data.posts || []); 
    })
       
    }, [])
    

  return (
     <>
     <section className='feed-section'>
       {
                post.length > 0 ? (
                    post.map((post) => (
                        <div key={post._id} className='post-card' >
                            <img src={post.image} alt={post.caption} />
                            <p>{post.caption}</p>
                        </div>
                    ))
                ) : (
                    <h1>No posts available</h1>
                )
            }

     </section>
     </>
  )
}

export default WatchPost