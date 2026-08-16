import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
  FaComment,
  FaBook,
  FaCalendarAlt,
  FaChartLine,
  FaBookOpen,
  FaUser,
  FaSignOutAlt,
  FaHeart,
  FaRobot,
} from "react-icons/fa";
import MoodTracker from "./MoodTracker";
import AffirmationDisplay from "./AffirmationDisplay";
import Header from "./Header";

const DashboardUser = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sand">
        <div className="container mx-auto px-6 py-10 max-w-7xl">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
                Welcome to your safe space
              </h2>
              <p className="text-stone">
                Here&rsquo;s your wellness overview — take it one gentle step at a time.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 self-start rounded-full bg-white border border-sand-deep text-ink px-5 py-2.5 text-sm font-semibold hover:border-ink hover:bg-sand-warm transition-all duration-300"
            >
              <FaSignOutAlt className="text-xs" /> Logout
            </button>
          </div>

          {/* AI Companion Banner */}
          <Link
            to="/chat"
            className="group mb-10 block rounded-3xl bg-ink text-sand shadow-soft p-8 md:p-10 relative overflow-hidden hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-taupe/30 blur-3xl" />
            <div className="flex items-center gap-6 relative">
              <span className="h-16 w-16 rounded-2xl bg-gradient-to-br from-taupe to-taupe-soft flex items-center justify-center text-3xl animate-pulse-soft">
                <FaRobot />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-1">
                  Mira, your AI companion
                </h3>
                <p className="text-stone-warm text-sm md:text-base">
                  I&rsquo;m always here to listen. Let&rsquo;s check in on how you&rsquo;re feeling today.
                </p>
              </div>
              <span className="hidden md:flex items-center gap-2 rounded-full bg-sand text-ink px-5 py-2.5 text-sm font-semibold group-hover:bg-white transition-colors">
                <FaComment className="text-xs" /> Start chat
              </span>
            </div>
          </Link>

          {/* Main Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <DashboardCard
              title="View Blogs"
              description="Explore wellness articles and insights"
              icon={<FaBook />}
              tone="bg-leaf-light text-leaf"
              link="/blog"
            />
            <DashboardCard
              title="Book Session"
              description="Schedule a counseling session"
              icon={<FaCalendarAlt />}
              tone="bg-taupe/15 text-taupe"
              link="/book-session"
            />
            <DashboardCard
              title="Progress"
              description="Monitor your wellness journey"
              icon={<FaChartLine />}
              tone="bg-ink/10 text-ink"
              link="/progress"
            />
            <DashboardCard
              title="Courses"
              description="Self-paced wellness programs"
              icon={<FaBookOpen />}
              tone="bg-leaf-light text-leaf"
              link="/courses"
            />
            <DashboardCard
              title="My Profile"
              description="Manage your profile settings"
              icon={<FaUser />}
              tone="bg-taupe/15 text-taupe"
              link="/user/profile"
            />
            <DashboardCard
              title="AI Companion"
              description="Talk to Mira, your AI therapist"
              icon={<FaRobot />}
              tone="bg-ink text-sand"
              link="/chat"
            />
          </div>

          {/* Wellness Tracking Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="font-display text-xl font-semibold text-ink mb-6 flex items-center gap-2">
                <FaHeart className="text-taupe" /> Mood Tracker
              </h3>
              <MoodTracker />
            </div>
            <div className="card">
              <h3 className="font-display text-xl font-semibold text-ink mb-6 flex items-center gap-2">
                <span className="text-taupe">✦</span> Today&rsquo;s Affirmation
              </h3>
              <AffirmationDisplay />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DashboardCard = ({ title, description, icon, tone, link }) => {
  return (
    <Link
      to={link}
      className="group rounded-3xl bg-white border border-sand-deep/60 p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
    >
      <span
        className={`h-14 w-14 rounded-2xl flex items-center justify-center text-2xl mb-5 ${tone} group-hover:scale-105 transition-transform`}
      >
        {icon}
      </span>
      <h3 className="font-display text-lg font-semibold text-ink mb-1">{title}</h3>
      <p className="text-sm text-stone">{description}</p>
    </Link>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  tone: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default DashboardUser;