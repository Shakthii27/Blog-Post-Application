import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api.js";
import PostSummary from "../components/PostSummary.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="status">Loading posts…</p>;
  if (error) return <p className="status error">Could not load posts: {error}</p>;
  if (posts.length === 0)
    return <p className="status">No posts yet. <Link to="/create">Write the first one.</Link></p>;

  return (
    <section>
      <h1>Latest posts</h1>
      {posts.map((p) => <PostSummary key={p._id} post={p} />)}
    </section>
  );
}
