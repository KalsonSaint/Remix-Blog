import { Link, useLoaderData } from "remix";

export const loader = () => {
  const data = {
    post: [
      { id: 1, title: "Post 1", body: "Post1 Test" },
      { id: 2, title: "Post 2", body: "Post2 Test" },
      { id: 3, title: "Post 3", body: "Post3 Test" },
    ],
  };
  return data;
};

const PostItems = () => {
  const { post } = useLoaderData();
  return (
    <>
      <div className="page-header">
        <h1>Post</h1>
        <Link to="/posts/new" className="btn">
          New Post
        </Link>
      </div>
      <ul className="posts-list">
        {post?.map((post) => (
          <li key={post.id}>
            <Link to={post.id}>
              <h3>{post.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostItems;
