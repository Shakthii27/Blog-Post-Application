import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";

const router = express.Router();
const posts = db.collection("posts");

// Validate the fields a post needs; returns an error string or null
function validate(body) {
  const { title, author, content } = body ?? {};
  if (!title?.trim()) return "Title is required";
  if (!author?.trim()) return "Author is required";
  if (!content?.trim()) return "Content is required";
  return null;
}

function parseId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

// GET /posts - all posts, newest first
router.get("/", async (req, res, next) => {
  try {
    const results = await posts.find({}).sort({ createdAt: -1 }).toArray();
    res.json(results);
  } catch (err) { next(err); }
});

// GET /posts/:id - one post
router.get("/:id", async (req, res, next) => {
  try {
    const _id = parseId(req.params.id);
    if (!_id) return res.status(400).json({ error: "Invalid post id" });
    const post = await posts.findOne({ _id });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) { next(err); }
});

// POST /posts - create
router.post("/", async (req, res, next) => {
  try {
    const error = validate(req.body);
    if (error) return res.status(400).json({ error });
    const now = new Date();
    const doc = {
      title: req.body.title.trim(),
      author: req.body.author.trim(),
      content: req.body.content.trim(),
      createdAt: now,
      updatedAt: now,
    };
    const result = await posts.insertOne(doc);
    res.status(201).json({ ...doc, _id: result.insertedId });
  } catch (err) { next(err); }
});

// PATCH /posts/:id - update
router.patch("/:id", async (req, res, next) => {
  try {
    const _id = parseId(req.params.id);
    if (!_id) return res.status(400).json({ error: "Invalid post id" });
    const error = validate(req.body);
    if (error) return res.status(400).json({ error });
    const updated = await posts.findOneAndUpdate(
      { _id },
      { $set: {
          title: req.body.title.trim(),
          author: req.body.author.trim(),
          content: req.body.content.trim(),
          updatedAt: new Date(),
      } },
      { returnDocument: "after" }
    );
    if (!updated) return res.status(404).json({ error: "Post not found" });
    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE /posts/:id - delete
router.delete("/:id", async (req, res, next) => {
  try {
    const _id = parseId(req.params.id);
    if (!_id) return res.status(400).json({ error: "Invalid post id" });
    const result = await posts.deleteOne({ _id });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) { next(err); }
});

export default router;
