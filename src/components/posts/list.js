import React, { useState } from "react";
import allPosts from "../resources/post";
import postResources from "../resources/post"


export const List = (props) => {
    const [list, setList] = useState([]);
   
    async function getPosts() {
      await allPosts.getPosts(list)
            .then(response => {
                setList(response);
                
                    
                props.dispatchList(list);
            })
    }

    return (
        <h1>{getPosts}</h1>
    )

}
