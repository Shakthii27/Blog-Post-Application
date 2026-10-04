import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, getPost, updatePost } from "../api.js";
import { formatDate } from "../components/PostSummary.jsx";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [form, setForm] = useState(null); // non-null while editing
  const [error, setError] = useState("");

  useEffect(() => {
    getPost(id).then(setPost).catch((e) => setError(e.message));
  }, [id]);

  async function onSave(e) {
    e.preventDefault();
    setError("");
    try {
      setPost(await updatePost(id, form));
      setForm(null);
    } catch (err) { setError(err.message); }
  }

  async function onDelete() {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    try {
      await deletePost(id);
      navigate("/");
    } catch (err) { setError(err.message); }
  }

  if (error && !post) return <p className="status error">{error} <Link to="/">Back to posts</Link></p>;
  if (!post) return <p className="status">Loading post…</p>;

  if (form)
    return (
      <section>
        <h1>Edit post</h1>
        <form onSubmit={onSave} className="form">
          <label>Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
          <label>Author<input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required /></label>
          <label>Content<textarea rows="10" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required /></label>
          {error && <p className="status error">{error}</p>}
          <div className="row">
            <button type="submit">Save changes</button>
            <button type="button" className="ghost" onClick={() => { setForm(null); setError(""); }}>Cancel</button>
          </div>
        </form>
      </section>
    );

  return (
    <article>
      <h1>{post.title}</h1>
      <p className="meta">
        {post.author} on {formatDate(post.createdAt)}
        {post.updatedAt !== post.createdAt && ` (edited ${formatDate(post.updatedAt)})`}
      </p>
      <div className="body">{post.content}</div>
      {error && <p className="status error">{error}</p>}
      <div className="row">
        <button onClick={() => setForm({ title: post.title, author: post.author, content: post.content })}>Edit post</button>
        <button className="danger" onClick={onDelete}>Delete post</button>
      </div>
    </article>
  );
}
