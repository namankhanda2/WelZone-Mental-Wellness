import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { FaComments, FaStar, FaCalendarAlt } from "react-icons/fa";
import API_URL from "../config";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const counselorId = localStorage.getItem("Id");
  const { sessionId } = useParams();

  const convertArrayToDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 5) {
      throw new Error("Invalid date array");
    }
    const [year, month, day, hour, minute] = dateArray;
    return new Date(year, month - 1, day, hour, minute);
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/feedback/${sessionId}`
        );
        const data = response.data;
        data.reverse();
        setFeedbacks(data);
      } catch {
        setError("Failed to fetch feedback. Please try again later.");
      }
    };

    fetchFeedbacks();
  }, [sessionId, counselorId]);

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <span className="chip bg-taupe/15 text-taupe mb-4">
            <FaComments className="text-xs" /> Session feedback
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink">
            Counselor Feedback
          </h1>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="space-y-6">
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <div
                key={feedback.feedbackId}
                className="card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <FaStar
                        key={n}
                        className={
                          n <= feedback.rating
                            ? "text-amber-500"
                            : "text-sand-deep"
                        }
                      />
                    ))}
                  </span>
                  <span className="text-sm text-stone">{feedback.rating} / 5</span>
                </div>
                <p className="text-ink mb-4">&ldquo;{feedback.comments}&rdquo;</p>
                <p className="flex items-center gap-2 text-xs text-stone">
                  <FaCalendarAlt className="text-taupe" /> Feedback date:{" "}
                  {new Date(
                    convertArrayToDate(feedback.createdAt)
                  ).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-stone py-10">No feedback available.</p>
          )}
        </div>
      </div>
    </>
  );
}