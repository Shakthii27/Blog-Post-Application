import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getPosts } from "../api.js";
import { formatDate } from "../components/PostSummary.jsx";

export default function Archive() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPosts().then(setPosts).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  async function onDelete(id) {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) { setError(err.message); }
  }

  if (loading) return <p className="status">Loading archive…</p>;

  return (
    <section>
      <h1>Archive</h1>
      {error && <p className="status error">{error}</p>}
      {posts.length === 0 && <p className="status">Nothing here yet.</p>}
      <ul className="archive">
        {posts.map((p) => (
          <li key={p._id}>
            <span className="date">{formatDate(p.createdAt)}</span>
            <Link to={`/post/${p._id}`}>{p.title}</Link>
            <button className="link-danger" onClick={() => onDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
