import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import {
  FaCalendarAlt,
  FaPencilAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaHeart,
  FaComments,
  FaChartLine,
} from "react-icons/fa";
import API_URL from "../config";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const DashboardCounsellor = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const counselorId = localStorage.getItem("Id");
    console.log(counselorId);

    const fetchUpcomingSessions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/slots/booked/${counselorId}`
        );
        console.log(response);

        if (Array.isArray(response.data)) {
          setUpcomingSessions(response.data);
        } else {
          setUpcomingSessions([]);
        }
      } catch (error) {
        console.error("Error fetching upcoming sessions:", error);
        setUpcomingSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingSessions();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navItems = [
    { label: "Manage Sessions", icon: <FaCalendarAlt />, to: "/counselor/sessions" },
    { label: "My Blogs", icon: <FaPencilAlt />, to: "/blogbyme" },
    { label: "Profile", icon: <FaUserCircle />, to: "/counselor/profile" },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sand flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-72 bg-ink text-sand shadow-soft p-6 lg:min-h-[calc(100vh-73px)]">
          <div className="p-2">
            <h1 className="font-display text-2xl font-bold text-sand flex items-center gap-2">
              <FaHeart className="text-taupe-soft" /> Counselor Hub
            </h1>
            <p className="text-sm text-stone-warm mt-1">
              Supporting those who support others
            </p>
          </div>
          <nav className="mt-8 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-stone-warm hover:bg-ink-soft hover:text-sand transition-all duration-200"
              >
                <span className="text-taupe-soft">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-stone-warm hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
            >
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          <h2 className="font-display text-3xl font-bold text-ink">
            Welcome back, Counselor
          </h2>
          <p className="mt-2 text-stone">
            Here are your upcoming sessions and quick insights.
          </p>

          {/* Upcoming Sessions */}
          <div className="mt-8 card">
            <h3 className="font-display text-xl font-bold text-ink mb-4">
              Upcoming Sessions
            </h3>
            {loading ? (
              <p className="text-stone animate-pulse-soft">Loading sessions...</p>
            ) : upcomingSessions.length === 0 ? (
              <p className="text-stone">No upcoming sessions found.</p>
            ) : (
              <ul className="divide-y divide-sand-deep/50">
                {upcomingSessions.map((session) => {
                  const startTime = convertArrayToDate(session.startTime);
                  const endTime = convertArrayToDate(session.endTime);

                  return (
                    <li
                      key={session.id}
                      className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 py-4"
                    >
                      <span className="font-medium text-ink flex items-center gap-2">
                        <FaComments className="text-taupe text-sm" />
                        Session with a User
                      </span>
                      <span className="text-sm text-stone">
                        {startTime.toLocaleString()} — {endTime.toLocaleString()}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Additional Widgets */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <span className="h-12 w-12 rounded-2xl bg-taupe/15 text-taupe flex items-center justify-center text-xl mb-4">
                <FaComments />
              </span>
              <h3 className="font-display text-lg font-bold text-ink">
                Feedback Received
              </h3>
              <p className="mt-2 text-sm text-stone">
                You have 5 new feedbacks to review.
              </p>
            </div>
            <div className="card">
              <span className="h-12 w-12 rounded-2xl bg-leaf-light text-leaf flex items-center justify-center text-xl mb-4">
                <FaChartLine />
              </span>
              <h3 className="font-display text-lg font-bold text-ink">Statistics</h3>
              <p className="mt-2 text-sm text-stone">
                You have conducted 10 sessions this month.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardCounsellor;