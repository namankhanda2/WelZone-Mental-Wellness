import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserPlus,
  FaRobot,
  FaHeart,
  FaCalendarAlt,
  FaChartLine,
  FaBookOpen,
  FaQuoteLeft,
  FaArrowRight,
  FaShieldAlt,
  FaBrain,
  FaComments,
} from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sand">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-sand/80 border-b border-sand-deep/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-2xl bg-ink flex items-center justify-center">
              <FaHeart className="text-sand text-lg" />
            </span>
            <span className="font-display text-2xl font-bold text-ink">
              WelZone
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone">
            <a href="#solutions" className="hover:text-ink transition-colors">Solutions</a>
            <a href="#how" className="hover:text-ink transition-colors">How it works</a>
            <a href="#impact" className="hover:text-ink transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-ink border border-stone/30 hover:border-ink hover:bg-white transition-all duration-300"
            >
              <FaSignInAlt /> Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-ink text-sand hover:bg-ink-soft transition-all duration-300"
            >
              <FaUserPlus /> Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-taupe/20 blur-3xl" />
        <div className="absolute top-40 -left-24 h-96 w-96 rounded-full bg-leaf/15 blur-3xl" />
        <div className="container mx-auto px-6 py-16 md:py-24 max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="animate-fade-up">
            <span className="chip bg-leaf-light text-leaf mb-6">
              <FaBrain /> AI-Powered Wellness
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-ink leading-[1.1] mb-6">
              Your mental wellness{" "}
              <span className="text-taupe">companion</span> in a safe space
            </h1>
            <p className="text-lg text-stone leading-relaxed mb-8 max-w-lg">
              WelZone brings counselling, mood tracking, and an ever-present AI
              companion together — helping you build resilience, calm, and
              well-being every single day.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => navigate("/register")}
                className="btn-accent"
              >
                <FaHeart /> Start your journey
              </button>
              <button
                onClick={() => navigate("/login")}
                className="btn-ghost"
              >
                Already a member <FaArrowRight className="text-xs" />
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm text-stone">
              <div className="flex -space-x-3">
                {["😊", "😌", "🧘", "💚"].map((e, i) => (
                  <span
                    key={i}
                    className="h-11 w-11 rounded-full bg-white shadow-card border border-sand-deep/60 flex items-center justify-center text-lg"
                  >
                    {e}
                  </span>
                ))}
              </div>
              <p className="font-medium">
                <span className="font-display font-bold text-ink text-xl">10,000+</span>
                <br />
                people finding their calm
              </p>
            </div>
          </div>

          {/* AI Companion Mock */}
          <div className="relative animate-fade-in">
            <div className="bg-ink rounded-3xl shadow-soft p-8 md:p-10 text-sand relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-taupe/30 blur-2xl" />
              <div className="flex items-center gap-4 mb-8 relative">
                <span className="h-14 w-14 rounded-2xl bg-gradient-to-br from-taupe to-taupe-soft flex items-center justify-center text-2xl animate-pulse-soft">
                  <FaRobot />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">Mira · AI Companion</h3>
                  <p className="text-sm text-stone-warm flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-leaf-soft animate-pulse" />
                    Always here for you
                  </p>
                </div>
              </div>
              <div className="space-y-4 relative">
                <div className="bg-ink-soft rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                  <p className="text-sm leading-relaxed">
                    I noticed you felt a little anxious today. Want to try a 2-minute breathing exercise together?
                  </p>
                </div>
                <div className="bg-taupe rounded-2xl rounded-br-sm p-4 ml-auto max-w-[70%]">
                  <p className="text-sm leading-relaxed">Yes, that sounds calming. Let&rsquo;s do it.</p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex-1 bg-ink-soft rounded-full px-4 py-3 text-sm text-stone-warm">
                    Breathe with me...
                  </div>
                  <button className="h-11 w-11 rounded-full bg-sand text-ink flex items-center justify-center hover:bg-white transition-colors">
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-8 text-xs text-stone-warm relative">
                <span className="flex items-center gap-2">
                  <FaShieldAlt /> Private & confidential
                </span>
                <span>Session 12 · streak 6 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="bg-sand-warm py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-in">
            <span className="chip bg-white text-taupe mb-4">Our Solutions</span>
            <h2 className="section-title mb-4">Care that fits around you</h2>
            <p className="text-stone text-lg">
              A truly comprehensive suite of products for your care, well-being,
              and belongingness.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SolutionCard
              title="AI Companion Chat"
              description="A calm, judgment-free AI companion available 24/7 — ready to listen, reflect, and guide breathing exercises."
              icon={<FaComments />}
              tone="bg-leaf-light text-leaf"
            />
            <SolutionCard
              title="Expert Counselling"
              description="One-on-one sessions with licensed psychologists, available whenever you need a human ear."
              icon={<FaCalendarAlt />}
              tone="bg-taupe/15 text-taupe"
            />
            <SolutionCard
              title="Mood & Progress Tracking"
              description="Log your moods daily and watch gentle, insightful patterns emerge in your wellness journey."
              icon={<FaChartLine />}
              tone="bg-ink/10 text-ink"
            />
            <SolutionCard
              title="Wellness Courses"
              description="Self-paced programs on stress, mindfulness, and emotional resilience — built by experts."
              icon={<FaBookOpen />}
              tone="bg-leaf-light text-leaf"
            />
            <SolutionCard
              title="Daily Affirmations"
              description="A small, kind note to yourself every day to rebuild confidence and self-compassion."
              icon={<FaQuoteLeft />}
              tone="bg-taupe/15 text-taupe"
            />
            <SolutionCard
              title="Safe Community"
              description="Belongingness matters. Engage in a supportive space where your story is heard."
              icon={<FaHeart />}
              tone="bg-ink/10 text-ink"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="chip bg-sand-warm text-taupe mb-4">How it works</span>
            <h2 className="section-title mb-4">Three steps to inner calm</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Create your safe space", d: "Sign up as a user or a counselor in under a minute — your data stays private." },
              { n: "02", t: "Check in with yourself", d: "Log your mood, talk to Mira, or book a session whenever you need support." },
              { n: "03", t: "Grow, gently", d: "Follow courses and affirmations, and watch your resilience build over time." },
            ].map((s) => (
              <div key={s.n} className="card hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
                <span className="font-display text-5xl font-extrabold text-sand-deep/60">{s.n}</span>
                <h3 className="font-display text-xl font-semibold mt-3 mb-2">{s.t}</h3>
                <p className="text-stone leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section id="impact" className="bg-ink py-20 text-sand relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-taupe/20 blur-3xl" />
        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="chip bg-ink-soft text-stone-warm mb-4">Creating waves of impact</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Real change, measured in moments
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <ImpactStat number="30L+" label="Therapy sessions conducted" />
            <ImpactStat number="1000+" label="Qualified experts" />
            <ImpactStat number="10,000+" label="Lives touched & saved" />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <FaQuoteLeft className="text-taupe/40 text-5xl mx-auto mb-6" />
          <p className="font-display text-2xl md:text-3xl font-medium text-ink leading-relaxed mb-8">
            &ldquo;WelZone gave me a space where I didn&rsquo;t have to hold my breath
            anymore. The AI companion felt like a friend, and my counselor felt
            like family.&rdquo;
          </p>
          <p className="font-semibold text-taupe">— Priya, WelZone member</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-5xl bg-ink rounded-3xl shadow-soft px-8 py-14 md:py-16 text-center text-sand relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-taupe/25 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Take the first step today
            </h2>
            <p className="text-stone-warm text-lg mb-8 max-w-xl mx-auto">
              Need a safe space to talk, or want to help others find theirs?
              Join the WelZone community now.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => navigate("/register")} className="btn-light">
                <FaUserPlus /> Create free account
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-sand/30 rounded-full px-6 py-3 text-sm font-semibold hover:bg-sand/10 transition-all duration-300"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </section>

      </div>
  );
};

// Reusable Card Components
const SolutionCard = ({ title, description, icon, tone }) => (
  <div className="card hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
    <span className={`h-14 w-14 rounded-2xl flex items-center justify-center text-2xl mb-5 ${tone}`}>
      {icon}
    </span>
    <h3 className="font-display text-xl font-semibold text-ink mb-2">{title}</h3>
    <p className="text-stone leading-relaxed">{description}</p>
  </div>
);

const ImpactStat = ({ number, label }) => (
  <div>
    <h3 className="font-display text-5xl font-bold text-sand mb-2">{number}</h3>
    <p className="text-stone-warm">{label}</p>
  </div>
);

SolutionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  tone: PropTypes.string.isRequired,
};

ImpactStat.propTypes = {
  number: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default LandingPage;