import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import {
  FaCalendarCheck,
  FaStar,
  FaBriefcase,
  FaGraduationCap,
  FaStethoscope,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

const convertArrayToDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 5) {
    throw new Error("Invalid date array");
  }

  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const BookSession = () => {
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      const userId = localStorage.getItem("Id");
      try {
        const availableSlotsResponse = await axios.get(
          "http://localhost:8080/slots/available"
        );
        setSlots(
          Array.isArray(availableSlotsResponse.data)
            ? availableSlotsResponse.data
            : []
        );

        const bookedSlotsResponse = await axios.get(
          `http://localhost:8080/slots/bookedbyme/${userId}`
        );
        setBookedSlots(
          Array.isArray(bookedSlotsResponse.data)
            ? bookedSlotsResponse.data
            : []
        );
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const bookSlot = async (slotId) => {
    const userId = localStorage.getItem("Id");
    try {
      const response = await axios.post(
        `http://localhost:8080/slots/book/${slotId}/user/${userId}`
      );
      if (response.status === 200) {
        setSlots(slots.filter((slot) => slot.slotId !== slotId));
        alert("Slot booked successfully!");
      }
    } catch (error) {
      alert("Slot booking failed.");
      console.error("Error booking slot:", error);
    }
  };

  if (loading)
    return (
      <>
        <Header />
        <p className="text-center text-stone py-20 animate-pulse-soft">Loading...</p>
      </>
    );
  if (slots.length === 0 && bookedSlots.length === 0)
    return (
      <>
        <Header />
        <p className="text-center text-stone py-20">
          No available or booked slots at the moment. Please check back later.
        </p>
      </>
    );

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-10 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
            Book a Session
          </h1>
          <p className="text-stone max-w-xl mx-auto">
            Choose a licensed counselor and a time that works for you. Your
            session is a safe, judgment-free space.
          </p>
        </div>

        <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-2">
          <span className="h-10 w-10 rounded-2xl bg-leaf-light text-leaf flex items-center justify-center">
            <FaStethoscope />
          </span>
          Available Slots
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
          {slots.map((slot) => (
            <div
              key={slot.slotId}
              className="card flex flex-col hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold text-ink mb-3">
                  {slot.counselorName}
                </h3>
                <div className="space-y-2 text-sm text-stone mb-4">
                  <p className="flex items-center gap-2">
                    <FaStar className="text-amber-500" /> {slot.rating}/5 rating
                  </p>
                  <p className="flex items-center gap-2">
                    <FaBriefcase className="text-taupe" /> {slot.experience} years
                  </p>
                  <p className="flex items-center gap-2">
                    <FaStethoscope className="text-leaf" /> {slot.specialization}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaGraduationCap className="text-taupe" /> {slot.qualification}
                  </p>
                  <p className="flex items-start gap-2 text-stone">
                    <FaClock className="text-taupe mt-1" />
                    <span>
                      {convertArrayToDate(slot.startTime).toLocaleString(
                        "en-US",
                        { dateStyle: "medium", timeStyle: "short" }
                      )}{" "}
                      —{" "}
                      {convertArrayToDate(slot.endTime).toLocaleString("en-US", {
                        timeStyle: "short",
                      })}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => bookSlot(slot.slotId)}
                className="btn-accent w-full"
              >
                Book Slot
              </button>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-2">
          <span className="h-10 w-10 rounded-2xl bg-taupe/15 text-taupe flex items-center justify-center">
            <FaCalendarCheck />
          </span>
          Your Booked Slots
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookedSlots.map((slot) => (
            <div
              key={slot.id}
              className="card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3 text-sm text-stone">
                <p className="flex items-center gap-2">
                  <FaClock className="text-taupe" />
                  <span>
                    {convertArrayToDate(slot.startTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}{" "}
                    —{" "}
                    {convertArrayToDate(slot.endTime).toLocaleString("en-US", {
                      timeStyle: "short",
                    })}
                  </span>
                </p>
                <button
                  onClick={() => navigate(`./${slot.id}`)}
                  className="flex items-center gap-2 rounded-full bg-ink text-sand px-5 py-2.5 text-sm font-semibold hover:bg-taupe transition-colors"
                >
                  See Details <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookSession;