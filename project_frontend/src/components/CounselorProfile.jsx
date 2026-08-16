import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import {
  FaBirthdayCake,
  FaEnvelope,
  FaPhone,
  FaStar,
  FaUser,
  FaBook,
  FaCalendarCheck,
  FaCalendarPlus,
  FaBriefcase,
  FaUserCircle,
} from "react-icons/fa";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const CounselorProfile = () => {
  const [counselor, setCounselor] = useState(null);
  const [error, setError] = useState("");
  const counselorId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchCounselorProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/counselors/id/${counselorId}`
        );
        setCounselor(response.data);
      } catch {
        setError("Failed to load profile. Please try again later.");
      }
    };

    fetchCounselorProfile();
  }, [counselorId]);

  if (error)
    return (
      <>
        <Header />
        <p className="text-red-500 text-center py-20">{error}</p>
      </>
    );
  if (!counselor)
    return (
      <>
        <Header />
        <p className="text-center text-stone py-20 animate-pulse-soft">
          Loading profile...
        </p>
      </>
    );

  const fields = [
    { icon: <FaUser />, label: "Username", value: counselor.username },
    { icon: <FaEnvelope />, label: "Email", value: counselor.email },
    { icon: <FaPhone />, label: "Phone Number", value: counselor.phone },
    {
      icon: <FaBirthdayCake />,
      label: "Date of Birth",
      value: new Date(
        convertArrayToDate(counselor.dateOfBirth)
      ).toLocaleDateString(),
    },
    { icon: <FaBook />, label: "Specialization", value: counselor.specialization },
    {
      icon: <FaStar />,
      label: "Rating",
      value: `${counselor.rating} / 5`,
    },
    {
      icon: <FaBriefcase />,
      label: "Experience",
      value: `${counselor.experience} years`,
    },
    {
      icon: <FaCalendarCheck />,
      label: "Account Created At",
      value: new Date(
        convertArrayToDate(counselor.createdAt)
      ).toLocaleDateString(),
    },
    {
      icon: <FaCalendarPlus />,
      label: "Last Updated At",
      value: new Date(
        convertArrayToDate(counselor.updatedAt)
      ).toLocaleDateString(),
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sand flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-lg animate-fade-up">
          <div className="bg-white rounded-3xl shadow-soft p-8 md:p-10">
            <div className="flex flex-col items-center mb-8">
              <span className="h-20 w-20 rounded-3xl bg-taupe/15 text-taupe flex items-center justify-center text-4xl mb-4">
                <FaUserCircle />
              </span>
              <h2 className="font-display text-2xl font-bold text-ink">
                Counselor Profile
              </h2>
              <span className="chip bg-leaf-light text-leaf mt-3">
                {counselor.specialization}
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

export default CounselorProfile;