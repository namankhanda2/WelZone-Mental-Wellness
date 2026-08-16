import { useState } from "react";
import axios from "axios";

const moodList = [
  { id: 1, name: "Happy", emoji: "😊", color: "hover:bg-leaf-light/60" },
  { id: 2, name: "Anxious", emoji: "😟", color: "hover:bg-taupe/20" },
  { id: 3, name: "Angry", emoji: "😠", color: "hover:bg-red-100" },
  { id: 4, name: "Demotivated", emoji: "😞", color: "hover:bg-sand-warm" },
  { id: 5, name: "Worthless", emoji: "😔", color: "hover:bg-sand-warm" },
  { id: 6, name: "Sad", emoji: "😢", color: "hover:bg-taupe/20" },
];

const MoodTracker = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [hoveredMood, setHoveredMood] = useState(null);

  const userId = localStorage.getItem("Id");

  const handleMoodClick = async (mood) => {
    try {
      await axios.post("http://localhost:8080/user-moods/set", null, {
        params: {
          userId: userId,
          moodId: mood.id,
        },
      });
      alert("Mood set successfully!");
      setCurrentMood(mood);
    } catch (error) {
      console.error("Error setting mood:", error);
      alert("Failed to set mood. Please try again.");
    }
  };

  return (
    <div className="mood-tracker text-center">
      <h2 className="font-display text-lg font-semibold text-ink mb-6">
        How are you feeling today?
      </h2>
      {!currentMood ? (
        <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
          {moodList.map((mood) => (
            <div
              key={mood.id}
              className="relative"
              onMouseEnter={() => setHoveredMood(mood.name)}
              onMouseLeave={() => setHoveredMood(null)}
            >
              <button
                onClick={() => handleMoodClick(mood)}
                className={`text-4xl rounded-2xl p-3 transition-all duration-200 hover:scale-110 hover:shadow-card ${mood.color}`}
              >
                {mood.emoji}
              </button>
              {hoveredMood === mood.name && (
                <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-ink text-sand text-xs font-medium px-3 py-1.5 rounded-lg shadow-soft whitespace-nowrap">
                  {mood.name}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-6 animate-fade-up">
          <p className="text-sm font-medium text-stone mb-2">Current Mood</p>
          <div className="text-6xl mb-3 animate-float inline-block">{currentMood.emoji}</div>
          <p className="text-taupe font-semibold">{currentMood.name}</p>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;