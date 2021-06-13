import React, { useState } from "react";
import allPosts from "../../resources/post";

export const List = () => {
    const [list, setList] = useState([]);
   
    async function getPosts() {
      await allPosts.getPosts(list)
            .then(response => {
                setList(response);
                
                    
                })
    }

    return (
        <h1>{getPosts}</h1>
        
    )

}
