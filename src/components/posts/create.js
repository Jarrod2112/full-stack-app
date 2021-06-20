import React, { useState } from "react";
import postResources from "../../resources/post";



export function Create(props) { 
  const [post, setPost] = useState("");
  
  async function handleClick() {
    await postResources.createPost(post);
    setPost("");
    props.onPostCreate();
  }

  return (

    <div className="container">
      {
        <div className="row">
          <div className="col">
          </div>
          <div className="col">
            <div className="card bg-dark text-white card w-100 mb-1">
              <div className="card bg-dark card w-100">
                <textarea className="textArea"
                  placeholder="Make a new post..."
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                />
              </div>
              <div className="d-md-flex d-grid gap-2 d-md-flex mb-1 justify-content-md-end">
                <button onClick={handleClick} type="button" className="btn btn-primary me-md-1 btn-sm">Post</button>
              </div>
            </div>
          </div>
          <div className="col">
          </div>
        </div>}
    </div>
  );
}