import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { FaCalendarPlus } from "react-icons/fa";
import API_URL from "../config";

const AddSlot = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const counselorId = localStorage.getItem("Id");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDateTime = (dateTime) => {
      const date = new Date(dateTime);
      return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
      ];
    };

    const slot = {
      counselorId: counselorId,
      startTime: formatDateTime(startTime),
      endTime: formatDateTime(endTime),
    };

    try {
      const response = await axios.post(
        `${API_URL}/slots/create`,
        slot
      );
      setMessage(response.data);

      navigate("/counselor/sessions");

      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Error creating slot:", error);
      setMessage("Failed to create slot. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sand flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg animate-fade-up">
          <div className="bg-white rounded-3xl shadow-soft p-8 md:p-10">
            <span className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-taupe/15 text-taupe flex items-center justify-center text-2xl">
              <FaCalendarPlus />
            </span>
            <h2 className="font-display text-2xl font-bold text-ink text-center mb-2">
              Add New Slot
            </h2>
            <p className="text-sm text-stone text-center mb-8">
              Open up a time for your next counselling session
            </p>

            {message && (
              <div
                className={`text-center mb-6 px-4 py-3 rounded-xl text-sm font-semibold ${
                  message.toLowerCase().includes("success")
                    ? "bg-leaf-light text-leaf"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-ink mb-1.5">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-ink mb-1.5">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <button type="submit" className="btn-accent w-full">
                Create Slot
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSlot;