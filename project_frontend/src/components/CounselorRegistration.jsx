import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { FaHeart } from "react-icons/fa";

const CounselorRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    specialization: "",
    qualification: "",
    experience: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dobParts = formData.dateOfBirth.split("-");
    const dateArray = [
      parseInt(dobParts[0]),
      parseInt(dobParts[1]),
      parseInt(dobParts[2]),
      0,
      0,
    ];

    const payload = {
      ...formData,
      dateOfBirth: dateArray,
    };

    try {
      await axios.post("http://localhost:8080/api/counselors", payload);
      setMessage("Counselor registered successfully! Please login.");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sand flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-taupe/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-leaf/15 blur-3xl" />
        <div className="w-full max-w-lg relative animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-12 w-12 rounded-2xl bg-ink flex items-center justify-center">
              <FaHeart className="text-sand text-xl" />
            </span>
            <span className="font-display text-3xl font-bold text-ink">WelZone</span>
          </div>

          <div className="bg-white rounded-3xl shadow-soft p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold text-ink text-center mb-2">
              Register as a Counselor
            </h2>
            <p className="text-sm text-stone text-center mb-8">
              Join our community of licensed professionals
            </p>

            {message && (
              <div
                className={`text-center mb-6 px-4 py-3 rounded-xl text-sm font-semibold ${
                  message.includes("successfully")
                    ? "bg-leaf-light text-leaf"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-ink mb-1.5">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-ink mb-1.5">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <label className="flex items-center gap-2 mt-2 text-sm text-stone cursor-pointer">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="accent-taupe h-4 w-4"
                  />
                  Show Password
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-ink mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-ink mb-1.5">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-ink mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-ink mb-1.5">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-ink mb-1.5">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-ink mb-1.5">
                  Experience (in years)
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <button type="submit" className="btn-accent w-full">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CounselorRegistration;