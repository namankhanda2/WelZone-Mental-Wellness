import { useNavigate } from "react-router-dom";
import { FaUser, FaUserTie, FaHeart, FaArrowRight } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const handleUserRegistration = () => {
    navigate("/userregistration");
  };

  const handleCounselorRegistration = () => {
    navigate("/counselorregistration");
  };

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-taupe/15 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-leaf/15 blur-3xl" />
      <div className="w-full max-w-2xl relative animate-fade-up">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-12 w-12 rounded-2xl bg-ink flex items-center justify-center">
            <FaHeart className="text-sand text-xl" />
          </span>
          <span className="font-display text-3xl font-bold text-ink">WelZone</span>
        </div>

        <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12 text-center space-y-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink mb-3">
              Join WelZone
            </h2>
            <p className="text-stone">
              Choose whether you&rsquo;d like to join as a User seeking support, or as
              a Counselor offering it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={handleUserRegistration}
              className="group rounded-3xl border border-sand-deep bg-sand p-8 text-center hover:border-taupe hover:bg-sand-warm hover:shadow-card transition-all duration-300"
            >
              <span className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-ink text-sand flex items-center justify-center text-3xl group-hover:bg-taupe transition-colors">
                <FaUser />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink mb-1">User</h3>
              <p className="text-sm text-stone mb-4">
                Access counselling, mood tracking, courses and your AI companion.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-taupe">
                Register <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={handleCounselorRegistration}
              className="group rounded-3xl border border-sand-deep bg-sand p-8 text-center hover:border-taupe hover:bg-sand-warm hover:shadow-card transition-all duration-300"
            >
              <span className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-taupe text-sand flex items-center justify-center text-3xl group-hover:bg-ink transition-colors">
                <FaUserTie />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink mb-1">Counselor</h3>
              <p className="text-sm text-stone mb-4">
                Manage sessions, publish blogs and grow your practice.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-taupe">
                Register <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          <p className="text-sm text-stone">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-ink underline underline-offset-4 hover:text-taupe transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;