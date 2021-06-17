import React, { useState } from "react";
import createResources from "../../resources/create";
import 'bootstrap/dist/css/bootstrap.min.css';




export function Create() {
  const [post, setPost] = useState("");

  return (

    <div class="conatiner">
      {
        <div class="row">
          <div class="col">
          </div>
          <div class="col">
            <div class="card bg-dark text-white card w-100 mb-1">
              <div class="card bg-dark card w-100">
                <textarea
                  placeholder="Make a new post..."
                  onChange={(e) => setPost(e.target.value)}
                />
              </div>
              <div class="d-md-flex d-grid gap-2 d-md-flex mb-1 justify-content-md-end">
                <button onClick ={createResources.createPost()}  type="button" class="btn btn-primary me-md-1 btn-sm">Post</button>
                </div>
            </div> 
          </div>

          <div class="col">
          </div>
        </div>}
    </div>
  );
}

