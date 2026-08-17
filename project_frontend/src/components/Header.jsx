import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import API_URL from "../config";

const Header = () => {
  const [username, setUsername] = useState("");
  const [whoLogged] = useState(localStorage.getItem("whoLogged"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedIn = whoLogged === "user" || whoLogged === "counselor";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const userId = localStorage.getItem("Id");
      const userType = localStorage.getItem("whoLogged");

      const fetchUsername = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/api/${userType}s/id/${userId}`
          );
          setUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };

      fetchUsername();
    } else {
      setUsername("");
    }
  }, [location.pathname, whoLogged]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!isLoggedIn) return null;

  const dashboardPath =
    whoLogged === "counselor" ? "/dashboardcounsellor" : "/dashboarduser";

  return (
    <header className="sticky top-0 z-40 bg-ink shadow-soft">
      <div className="container mx-auto px-6 py-4 max-w-7xl flex items-center justify-between">
        <Link
          to={dashboardPath}
          className="flex items-center gap-3 transition-transform transform hover:scale-105"
        >
          <span className="h-10 w-10 rounded-2xl bg-taupe flex items-center justify-center">
            <FaHeart className="text-sand text-lg" />
          </span>
          <span className="font-display text-2xl font-bold text-sand">
            WelZone
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {username && (
            <span className="flex items-center gap-2 text-sm font-medium text-stone-warm">
              <FaUserCircle className="text-taupe-soft text-xl" />
              {username}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full bg-ink-soft text-sand px-4 py-2 text-sm font-semibold hover:bg-taupe transition-all duration-300"
          >
            <FaSignOutAlt className="text-xs" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;