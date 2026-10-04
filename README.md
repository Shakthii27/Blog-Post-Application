# Field Notes: Blog/Post Management App

React (Vite) -> fetch() -> Express REST API -> MongoDB Atlas

## Setup
1. Server: `cd server && npm install`, then put your connection string in `server/.env` (`ATLAS_URI`). In Atlas, add your IP under Network Access.
   Run with `npm start` (http://localhost:5050).
2. App: `cd app && npm install && npm run dev` (http://localhost:5173).

## REST API
| Method | Route | Purpose |
|---|---|---|
| GET | /posts | List all posts (newest first) |
| GET | /posts/:id | Get one post |
| POST | /posts | Create (title, author, content) |
| PATCH | /posts/:id | Update a post |
| DELETE | /posts/:id | Delete a post |

Add `.env` to `.gitignore` before committing; it holds your database password.
