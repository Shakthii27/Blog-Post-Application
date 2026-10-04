# Blog Post Application

A full-stack blog post application where users can create and view blog posts.
React (Vite) -> fetch() -> Express REST API -> MongoDB Atlas

## Features

- Create blog posts
- Add title, author, and content
- View published posts
- React frontend
- Node.js backend
- Database integration
- REST API for posts

## REST API
| Method | Route | Purpose |
|---|---|---|
| GET | /posts | List all posts (newest first) |
| GET | /posts/:id | Get one post |
| POST | /posts | Create (title, author, content) |
| PATCH | /posts/:id | Update a post |
| DELETE | /posts/:id | Delete a post |

Add `.env` to `.gitignore` before committing; it holds your database password.
