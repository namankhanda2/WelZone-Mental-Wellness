import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import API_URL from "../config";
import {
  FaBirthdayCake,
  FaCalendarCheck,
  FaCalendarPlus,
  FaEnvelope,
  FaPhone,
  FaTransgender,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/users/id/${userId}`
        );
        setUser(response.data);
      } catch {
        setError("Failed to load profile. Please try again later.");
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (error)
    return (
      <>
        <Header />
        <p className="text-red-500 text-center py-20">{error}</p>
      </>
    );
  if (!user)
    return (
      <>
        <Header />
        <p className="text-center text-stone py-20 animate-pulse-soft">
          Loading profile...
        </p>
      </>
    );

  const fields = [
    { icon: <FaUser />, label: "Username", value: user.username },
    { icon: <FaEnvelope />, label: "Email", value: user.email },
    { icon: <FaPhone />, label: "Phone Number", value: user.phoneNumber },
    {
      icon: <FaBirthdayCake />,
      label: "Date of Birth",
      value: new Date(convertArrayToDate(user.dateOfBirth)).toLocaleDateString(),
    },
    { icon: <FaTransgender />, label: "Gender", value: user.gender },
    {
      icon: <FaCalendarPlus />,
      label: "Account Created At",
      value: new Date(convertArrayToDate(user.createdAt)).toLocaleDateString(),
    },
    {
      icon: <FaCalendarCheck />,
      label: "Last Updated At",
      value: new Date(convertArrayToDate(user.updatedAt)).toLocaleDateString(),
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sand flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-lg animate-fade-up">
          <div className="bg-white rounded-3xl shadow-soft p-8 md:p-10">
            <div className="flex flex-col items-center mb-8">
              <span className="h-20 w-20 rounded-3xl bg-leaf-light text-leaf flex items-center justify-center text-4xl mb-4">
                <FaUserCircle />
              </span>
              <h2 className="font-display text-2xl font-bold text-ink">
                My Profile
              </h2>
              <span className="chip bg-taupe/15 text-taupe mt-3">
                WelZone Member
              </span>
            </div>
            <div className="space-y-3">
              {fields.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-2xl bg-sand px-4 py-3"
                >
                  <span className="text-taupe text-lg">{f.icon}</span>
                  <span className="font-semibold text-sm text-stone w-40">
                    {f.label}
                  </span>
                  <span className="ml-auto text-sm font-medium text-ink text-right">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;