import React, { useState, useEffect } from "react";

const Post = (props) => {

  const [postState, setPostState] = useState(props.location.post ? props.location.post : JSON.parse(localStorage.getItem("post")));
  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(postState));
  }, [])
  return (
    <div>
      <div className="col-sm-12">
        <div className="card" >
          <img src={postState.urlToImage} className="card-img-top" alt="..." />
        </div>
      </div>
      <div className="col-sm-12">
        <div className="card" >
          <div className="card-body">
            <p className="card-text">{postState.author}</p>
            <h5 className="card-title">{postState.title}</h5>
            <p className="card-text">{postState.description}</p>
            <p className="card-text">{postState.content}</p>
            <p className="card-text">{postState.url}</p>
            <p className="card-text">{postState.publishedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;