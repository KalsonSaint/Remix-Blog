import React from "react";
import { Link } from "remix";

const NewPost = () => {
  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content"></div>
    </>
  );
};

export default NewPost;
