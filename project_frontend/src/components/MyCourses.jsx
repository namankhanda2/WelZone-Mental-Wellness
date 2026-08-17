import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { FaBookOpen, FaTag, FaCalendarAlt } from "react-icons/fa";
import API_URL from "../config";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/enrollments/${userId}`
        );
        console.log(response.data);
        setCourses(response.data);
      } catch {
        setError("Failed to fetch your courses. Please try again later.");
      }
    };

    fetchMyCourses();
  }, [userId]);

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
            My Enrolled Courses
          </h1>
          <p className="text-stone">Keep growing, one gentle step at a time.</p>
        </div>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.courseId}
                className="card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
              >
                <span className="h-14 w-14 rounded-2xl bg-leaf-light text-leaf flex items-center justify-center text-2xl mb-5">
                  <FaBookOpen />
                </span>
                <h2 className="font-display text-xl font-semibold text-ink mb-2">
                  {course.title}
                </h2>
                <p className="text-stone text-sm mb-5">{course.description}</p>
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 font-semibold text-leaf">
                    <FaTag className="text-xs" /> ${course.price}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-stone">
                    <FaCalendarAlt />{" "}
                    {new Date(course.enrollmentDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-stone py-16">
              You are not enrolled in any courses yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourses;