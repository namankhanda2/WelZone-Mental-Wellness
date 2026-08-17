import { useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt, FaFeather, FaCalendarAlt } from "react-icons/fa";
import Header from "./Header";
import API_URL from "../config";

const BlogByCounselor = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const counselorId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/blogs/counselor/${counselorId}`
        );
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          setBlogs([]);
          setError("No blogs found.");
        }
      } catch {
        setError("Failed to fetch blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, [counselorId]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      counselorId: counselorId,
      title: newTitle,
      content: newContent,
    };

    try {
      const response = await axios.post(
        "${API_URL}/blogs/create",
        newBlog
      );
      setFormMessage("Blog created successfully!");
      setBlogs((prevBlogs) => [...prevBlogs, response.data]);
      setNewTitle("");
      setNewContent("");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating blog:", error);
      setFormMessage("Failed to create blog. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
            Blogs by You
          </h1>
          <p className="text-stone">
            Share your knowledge — it could be the light someone needs today.
          </p>
        </div>
        {error && (
          <p className="text-red-500 text-center mb-6">{error}</p>
        )}

        {blogs.length > 0 ? (
          <div className="space-y-5">
            {blogs.map((blog) => (
              <div key={blog.id} className="card">
                <div className="flex items-start gap-4">
                  <span className="h-12 w-12 shrink-0 rounded-2xl bg-leaf-light text-leaf flex items-center justify-center text-xl">
                    <FaFeather />
                  </span>
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-semibold text-ink mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-stone text-sm leading-relaxed mb-3">
                      {blog.content}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-stone">
                      <FaCalendarAlt className="text-taupe" /> Published on{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-stone py-10">No blogs available.</p>
        )}

        <button
          className="fixed bottom-8 right-8 bg-ink text-sand h-14 w-14 rounded-full shadow-soft hover:bg-taupe transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
          onClick={() => setShowForm(!showForm)}
          aria-label="Create new blog"
        >
          <FaPencilAlt size={20} />
        </button>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-soft w-full max-w-md animate-fade-up">
              <h2 className="font-display text-2xl font-bold text-ink mb-6">
                Create New Blog
              </h2>
              {formMessage && (
                <p
                  className={`mb-4 px-4 py-3 rounded-xl text-sm font-semibold ${
                    formMessage.includes("successfully")
                      ? "bg-leaf-light text-leaf"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {formMessage}
                </p>
              )}
              <form onSubmit={handleCreateBlog} className="space-y-5">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-ink mb-1.5">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-ink mb-1.5">
                    Content
                  </label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    required
                    rows="5"
                    className="input-field resize-none"
                  />
                </div>
                <button type="submit" className="btn-accent w-full">
                  Publish Blog
                </button>
              </form>
              <button
                className="mt-4 text-sm font-semibold text-stone hover:text-ink transition-colors"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogByCounselor;