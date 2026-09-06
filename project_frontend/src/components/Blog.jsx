import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { FaFeather, FaCalendarAlt } from "react-icons/fa";
import API_URL from "../config";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/blogs/all`);
        setBlogs(response.data);
      } catch {
        setError("Failed to fetch blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <span className="chip bg-white text-taupe mb-4">
            <FaFeather className="text-xs" /> From our counselors
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
            Wellness Stories & Insights
          </h1>
          <p className="text-stone max-w-xl mx-auto">
            Gentle reads crafted by our experts to support your journey.
          </p>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="card cursor-pointer hover:shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col"
              onClick={() => handleBlogClick(blog)}
            >
              <span className="h-12 w-12 rounded-2xl bg-leaf-light text-leaf flex items-center justify-center text-xl mb-5">
                <FaFeather />
              </span>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">
                {blog.title}
              </h2>
              <p className="text-stone text-sm mb-4 flex-1">
                {blog.content.slice(0, 100)}...
              </p>
              <p className="flex items-center gap-2 text-sm font-semibold text-taupe">
                <FaCalendarAlt className="text-xs" /> Posted on{" "}
                {convertArrayToDate(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {isModalOpen && selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm p-4">
            <div className="relative bg-white rounded-3xl shadow-soft p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-fade-up">
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 h-10 w-10 rounded-full bg-sand flex items-center justify-center text-stone hover:text-ink hover:bg-sand-warm transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <span className="chip bg-leaf-light text-leaf mb-5">
                <FaFeather className="text-xs" /> Wellness blog
              </span>
              <h2 className="font-display text-3xl font-bold text-ink mb-6">
                {selectedBlog.title}
              </h2>
              <p className="text-stone leading-relaxed mb-6">
                {selectedBlog.content}
              </p>
              <p className="flex items-center gap-2 text-sm text-stone">
                <FaCalendarAlt className="text-taupe" /> Posted on{" "}
                {convertArrayToDate(selectedBlog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;