import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { FaBookOpen, FaCalendarAlt, FaTag, FaArrowRight } from "react-icons/fa";
import API_URL from "../config";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("available");
  const userId = localStorage.getItem("Id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("${API_URL}/courses");
        setCourses(response.data);
      } catch {
        setError("Failed to fetch available courses. Please try again later.");
      }
    };

    const fetchMyCourses = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/enrollments/${userId}`
        );
        setMyCourses(response.data);
      } catch {
        setError("Failed to fetch your courses. Please try again later.");
      }
    };

    fetchCourses();
    fetchMyCourses();
    setLoading(false);
  }, [userId, activeTab]);

  const handleEnroll = async (courseId) => {
    const courseEnrollment = { userId, courseId };
    try {
      const response = await axios.post(
        "${API_URL}/enrollments",
        courseEnrollment
      );
      alert(response.data);
    } catch {
      alert("Failed to enroll in the course. Please try again later.");
    }
  };

  if (loading)
    return (
      <>
        <Header />
        <p className="text-center text-stone py-20">Loading courses...</p>
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <p className="text-center text-red-500 py-20">{error}</p>
      </>
    );

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-10 max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
            Wellness Courses
          </h1>
          <p className="text-stone max-w-xl mx-auto">
            Self-paced programs crafted by experts to help you build resilience,
            mindfulness, and emotional strength.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          <button
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
              activeTab === "available"
                ? "bg-ink text-sand shadow-soft"
                : "bg-white text-stone border border-sand-deep/60 hover:border-ink"
            }`}
            onClick={() => setActiveTab("available")}
          >
            Available Courses
          </button>
          <button
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
              activeTab === "myCourses"
                ? "bg-ink text-sand shadow-soft"
                : "bg-white text-stone border border-sand-deep/60 hover:border-ink"
            }`}
            onClick={() => setActiveTab("myCourses")}
          >
            My Courses
          </button>
        </div>

        {activeTab === "available" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div
                    key={course.courseId}
                    className="card flex flex-col hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="h-14 w-14 rounded-2xl bg-leaf-light text-leaf flex items-center justify-center text-2xl mb-5">
                      <FaBookOpen />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-ink mb-2">
                      {course.title}
                    </h3>
                    <p className="text-stone text-sm mb-5 flex-1">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between mb-5">
                      <p className="flex items-center gap-2 font-semibold text-leaf">
                        <FaTag className="text-xs" /> ${course.price}
                      </p>
                      <p className="flex items-center gap-2 text-xs text-stone">
                        <FaCalendarAlt />{" "}
                        {new Date(
                          convertArrayToDate(course.createdAt)
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEnroll(course.courseId)}
                      className="btn-accent w-full"
                    >
                      Enroll
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-stone col-span-full text-center py-10">
                  No courses available.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "myCourses" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.length > 0 ? (
                myCourses.map((course) => (
                  <div
                    key={course.courseId}
                    className="card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="h-14 w-14 rounded-2xl bg-taupe/15 text-taupe flex items-center justify-center text-2xl mb-5">
                      <FaBookOpen />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-ink mb-2">
                      {course.title}
                    </h3>
                    <p className="text-stone text-sm mb-5">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-leaf">
                        ${course.price}
                      </p>
                      <p className="text-xs text-stone">
                        Enrolled{" "}
                        {new Date(
                          convertArrayToDate(course.enrollmentDate)
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-stone mb-4">
                    You are not enrolled in any courses yet.
                  </p>
                  <button
                    onClick={() => navigate("/courses")}
                    className="btn-primary"
                  >
                    Browse courses <FaArrowRight className="text-xs" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CoursesPage;