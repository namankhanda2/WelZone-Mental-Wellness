import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";
import {
  FaUserCircle,
  FaClock,
  FaCalendarAlt,
  FaStar,
  FaPaperPlane,
} from "react-icons/fa";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const SessionDetails = () => {
  const [sessionDetails, setSessionDetails] = useState(null);
  const { sessionId } = useParams();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/slots/${sessionId}`
        );
        setSessionDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch session details:", err);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  return (
    <div className="card">
      <h2 className="font-display text-xl font-semibold text-ink mb-5">
        Session Details
      </h2>
      {sessionDetails ? (
        <div className="space-y-3">
          <p className="flex items-center gap-3 text-sm text-ink">
            <FaUserCircle className="text-taupe text-lg" />
            <span className="text-stone w-36">Counselor Name</span>
            <span className="font-semibold">{sessionDetails.counselorName}</span>
          </p>
          <p className="flex items-center gap-3 text-sm text-ink">
            <FaClock className="text-taupe text-lg" />
            <span className="text-stone w-36">Start Time</span>
            <span className="font-medium">
              {convertArrayToDate(sessionDetails.startTime).toLocaleString()}
            </span>
          </p>
          <p className="flex items-center gap-3 text-sm text-ink">
            <FaClock className="text-taupe text-lg" />
            <span className="text-stone w-36">End Time</span>
            <span className="font-medium">
              {convertArrayToDate(sessionDetails.endTime).toLocaleString()}
            </span>
          </p>
          <p className="flex items-center gap-3 text-sm text-ink">
            <FaCalendarAlt className="text-taupe text-lg" />
            <span className="text-stone w-36">Booked</span>
            <span
              className={`chip ${
                sessionDetails.booked
                  ? "bg-leaf-light text-leaf"
                  : "bg-sand-warm text-stone"
              }`}
            >
              {sessionDetails.booked ? "Yes" : "No"}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-stone animate-pulse-soft">Loading session details...</p>
      )}
    </div>
  );
};

const UserFeedback = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { sessionId } = useParams();

  const fetchFeedbackList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/feedback/${sessionId}`
      );
      const data = response.data;
      data.reverse();
      setFeedbackList(data);
    } catch (err) {
      console.error("Failed to fetch feedback list:", err);
    }
  };

  useEffect(() => {
    fetchFeedbackList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!comments) {
      setError("Please provide your comments.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:8080/api/feedback", {
        sessionId,
        rating,
        comments,
      });
      setSuccess("Feedback submitted successfully!");
      setRating(0);
      setComments("");
      fetchFeedbackList();
    } catch {
      setError("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sand px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink text-center mb-10">
            Feedback Page
          </h1>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column */}
            <div className="lg:w-1/2 space-y-6">
              <SessionDetails />
              <h2 className="font-display text-xl font-semibold text-ink">
                Feedback from Users
              </h2>
              <ul className="space-y-4">
                {feedbackList.map((feedback, index) => (
                  <li key={index} className="card">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center gap-1">
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
                    </div>
                    <p className="text-ink text-sm">&ldquo;{feedback.comments}&rdquo;</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/2">
              <div className="card">
                <h2 className="font-display text-xl font-semibold text-ink mb-6">
                  Submit Your Feedback
                </h2>
                {error && (
                  <p className="text-red-500 text-sm mb-4 rounded-xl bg-red-50 px-4 py-3">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-leaf text-sm mb-4 rounded-xl bg-leaf-light px-4 py-3">
                    {success}
                  </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Rating
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="input-field"
                    >
                      <option value={0}>Select Rating</option>
                      <option value={1}>1 — Poor</option>
                      <option value={2}>2 — Fair</option>
                      <option value={3}>3 — Good</option>
                      <option value={4}>4 — Very Good</option>
                      <option value={5}>5 — Excellent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Comments
                    </label>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="input-field resize-none h-32"
                      placeholder="Share your experience..."
                    />
                  </div>
                  <button type="submit" className="btn-accent w-full">
                    <FaPaperPlane className="text-sm" /> Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFeedback;