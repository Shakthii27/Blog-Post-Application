import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import Post from "./pages/Post.jsx";
import Archive from "./pages/Archive.jsx";

export default function App() {
  return (
    <>
      <header className="masthead">
        <NavLink to="/" className="brand">Field Notes</NavLink>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/archive">Archive</NavLink>
          <NavLink to="/create" className="nav-cta">New post</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="*" element={<p className="status">Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
