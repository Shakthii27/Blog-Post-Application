import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api.js";

export default function Create() {
  const [form, setForm] = useState({ title: "", author: "", content: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const post = await createPost(form);
      navigate(`/post/${post._id}`);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <section>
      <h1>New post</h1>
      <form onSubmit={onSubmit} className="form">
        <label>Title<input name="title" value={form.title} onChange={onChange} required /></label>
        <label>Author<input name="author" value={form.author} onChange={onChange} required /></label>
        <label>Content<textarea name="content" rows="10" value={form.content} onChange={onChange} required /></label>
        {error && <p className="status error">{error}</p>}
        <button type="submit" disabled={saving}>{saving ? "Publishing…" : "Publish post"}</button>
      </form>
    </section>
  );
}
