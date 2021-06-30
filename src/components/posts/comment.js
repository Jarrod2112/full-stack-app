import React, { useState } from "react";
import postResources from "../../resources/post";

export const Comment = (props) => {
    const [comment, setComment] = useState("")

    async function handleClick() {
        await postResources.createComment(comment, props.post._id);
        setComment("");
    }

    return (
        <div className="container">
            <div className="card bg-dark card w-100">
                <input
                    placeholder="Write a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></input>
            </div>
            <div className="d-md-flex d-grid gap-2 d-md-flex mb-1 justify-content-md-end">
                <button
                    onClick={handleClick}
                    type="button"
                    className="btn btn-primary me-md-1 btn-sm "
                >
                    Comment
        </button>
            </div>
        </div>
    );
};
