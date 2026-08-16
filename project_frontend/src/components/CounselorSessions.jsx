import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import {
  FaCalendarPlus,
  FaClock,
  FaComments,
  FaArrowRight,
} from "react-icons/fa";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const CounselorSessions = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const counselorId = localStorage.getItem("Id");

    const fetchUpcomingSessions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/slots/booked/${counselorId}`
        );

        if (Array.isArray(response.data)) {
          setUpcomingSessions(response.data);
        } else {
          setUpcomingSessions([]);
        }
      } catch (error) {
        console.error("Error fetching upcoming sessions:", error);
        setUpcomingSessions([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/slots/available/${counselorId}`
        );

        if (Array.isArray(response.data)) {
          setAvailableSlots(response.data);
        } else {
          setAvailableSlots([]);
        }
      } catch (error) {
        console.error("Error fetching available slots:", error);
        setAvailableSlots([]);
      }
    };

    fetchUpcomingSessions();
    fetchAvailableSlots();
  }, []);

  const handleAddSlot = () => {
    navigate("/counselor/add-slot");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sand p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="font-display text-3xl font-bold text-ink">
              Manage Your Sessions
            </h1>
            <button
              onClick={handleAddSlot}
              className="btn-accent self-start"
            >
              <FaCalendarPlus className="text-sm" /> Add New Slot
            </button>
          </div>

          <div className="card mb-8">
            <h3 className="font-display text-xl font-bold text-ink mb-4">
              Upcoming Sessions
            </h3>
            {loading ? (
              <p className="text-stone animate-pulse-soft">Loading sessions...</p>
            ) : upcomingSessions.length === 0 ? (
              <p className="text-stone">No upcoming sessions found.</p>
            ) : (
              <ul className="divide-y divide-sand-deep/50">
                {upcomingSessions.map((session) => {
                  const startTime = convertArrayToDate(session.startTime);
                  const endTime = convertArrayToDate(session.endTime);

                  return (
                    <li
                      key={session.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-4"
                    >
                      <div className="flex items-center gap-3 text-ink">
                        <span className="h-10 w-10 rounded-xl bg-taupe/15 text-taupe flex items-center justify-center">
                          <FaComments className="text-sm" />
                        </span>
                        <span className="font-medium">Session with a User</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-stone">
                        <FaClock className="text-taupe text-xs" />
                        {startTime.toLocaleString()} — {endTime.toLocaleString()}
                      </div>
                      <button
                        onClick={() => navigate(`./${session.id}`)}
                        className="flex items-center gap-2 rounded-full bg-ink text-sand px-4 py-2 text-sm font-semibold hover:bg-taupe transition-colors"
                      >
                        See details <FaArrowRight className="text-xs" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold text-ink mb-4">
              Available Slots
            </h3>
            {availableSlots.length === 0 ? (
              <p className="text-stone">No available slots found.</p>
            ) : (
              <ul className="divide-y divide-sand-deep/50">
                {availableSlots.map((slot) => {
                  const startTime = convertArrayToDate(slot.startTime);
                  const endTime = convertArrayToDate(slot.endTime);

                  return (
                    <li
                      key={slot.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-4"
                    >
                      <div className="flex items-center gap-3 text-ink">
                        <span className="h-10 w-10 rounded-xl bg-leaf-light text-leaf flex items-center justify-center">
                          <FaClock className="text-sm" />
                        </span>
                        <span className="font-medium">Available Slot</span>
                      </div>
                      <div className="text-sm text-stone">
                        {startTime.toLocaleString()} — {endTime.toLocaleString()}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CounselorSessions;