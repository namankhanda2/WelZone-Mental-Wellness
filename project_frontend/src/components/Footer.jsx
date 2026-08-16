import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-sand-deep/60 bg-sand py-10">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-xl bg-ink flex items-center justify-center">
            <FaHeart className="text-sand text-sm" />
          </span>
          <span className="font-display font-bold text-ink">WelZone</span>
        </div>
        <p className="text-sm text-stone text-center">
          &copy; {new Date().getFullYear()} WelZone. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm text-stone">
          <Link to="/login" className="hover:text-ink transition-colors">
            Login
          </Link>
          <Link to="/register" className="hover:text-ink transition-colors">
            Register
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;