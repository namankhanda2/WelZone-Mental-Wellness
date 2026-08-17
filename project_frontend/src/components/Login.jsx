import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaUsers, FaUserTie, FaHeart } from "react-icons/fa";
import API_URL from "../config";

const Login = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = API_URL;
    const endpoint =
      userType === "user"
        ? `${baseUrl}/api/users/login`
        : `${baseUrl}/api/counselors/login`;

    try {
      const response = await axios.post(endpoint, { username, password });

      const responseData = response.data;
      localStorage.setItem("token", responseData.token);

      if (userType === "user") {
        localStorage.setItem("Id", responseData.userId);
        localStorage.setItem("whoLogged", "user");
      } else if (userType === "counselor") {
        localStorage.setItem("Id", responseData.counselorId);
        localStorage.setItem("whoLogged", "counselor");
      }
      localStorage.setItem("isAuthenticated", "true");
      console.log(responseData.token);

      if (userType === "user") {
        navigate("/dashboarduser");
      } else {
        navigate("/dashboardcounsellor");
      }
    } catch {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-taupe/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-leaf/15 blur-3xl" />
      <div className="w-full max-w-md relative animate-fade-up">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-12 w-12 rounded-2xl bg-ink flex items-center justify-center">
            <FaHeart className="text-sand text-xl" />
          </span>
          <span className="font-display text-3xl font-bold text-ink">WelZone</span>
        </div>

        <div className="bg-white rounded-3xl shadow-soft p-8 space-y-6">
          <h2 className="font-display text-2xl font-bold text-ink text-center">
            Welcome back
          </h2>
          <p className="text-sm text-stone text-center -mt-4">
            Sign in to continue your wellness journey
          </p>

          {!userType ? (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-stone text-center">
                Select user type
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleUserTypeSelection("user")}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-sand-deep bg-sand p-6 hover:border-taupe hover:bg-sand-warm hover:shadow-card transition-all duration-300 group"
                >
                  <span className="h-14 w-14 rounded-2xl bg-ink text-sand flex items-center justify-center text-2xl group-hover:bg-taupe transition-colors">
                    <FaUsers />
                  </span>
                  <span className="font-semibold text-ink">User</span>
                  <span className="text-xs text-stone">Seeking support</span>
                </button>
                <button
                  onClick={() => handleUserTypeSelection("counselor")}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-sand-deep bg-sand p-6 hover:border-taupe hover:bg-sand-warm hover:shadow-card transition-all duration-300 group"
                >
                  <span className="h-14 w-14 rounded-2xl bg-taupe text-sand flex items-center justify-center text-2xl group-hover:bg-ink transition-colors">
                    <FaUserTie />
                  </span>
                  <span className="font-semibold text-ink">Counselor</span>
                  <span className="text-xs text-stone">Offering support</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="rounded-xl bg-red-50 border border-red-200 text-red-600 text-center px-4 py-3 text-sm">
                  {errorMessage}
                </div>
              )}
              <div className="flex items-center bg-sand rounded-xl px-4 border border-sand-deep/60 focus-within:border-taupe focus-within:ring-2 focus-within:ring-taupe/20 transition-all">
                <FaUser className="text-stone-warm mr-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Username"
                  className="w-full py-3 bg-transparent border-none focus:outline-none text-sm"
                />
              </div>
              <div className="flex items-center bg-sand rounded-xl px-4 border border-sand-deep/60 focus-within:border-taupe focus-within:ring-2 focus-within:ring-taupe/20 transition-all">
                <FaLock className="text-stone-warm mr-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="w-full py-3 bg-transparent border-none focus:outline-none text-sm"
                />
              </div>
              <button type="submit" className="btn-accent w-full">
                <FaLock className="text-sm" /> Sign in
              </button>
              <button
                type="button"
                onClick={() => handleUserTypeSelection("")}
                className="w-full text-sm text-stone hover:text-ink transition-colors"
              >
                ← Back to user type selection
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;