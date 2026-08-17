import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Header from "./Header";
import { FaChartLine, FaHeart } from "react-icons/fa";
import API_URL from "../config";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const moodMap = {
  1: { name: "Happy", yValue: 5, emoji: "😊" },
  2: { name: "Anxious", yValue: 3, emoji: "😟" },
  3: { name: "Angry", yValue: 2, emoji: "😠" },
  4: { name: "Demotivated", yValue: 2, emoji: "😞" },
  5: { name: "Worthless", yValue: 1, emoji: "😔" },
  6: { name: "Sad", yValue: 1, emoji: "😢" },
};

const MoodProgress = () => {
  const [moodData, setMoodData] = useState([]);
  const userId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user-moods/${userId}`
        );
        setMoodData(response.data);
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };

    fetchMoodData();
  }, [userId]);

  const dates = moodData.map((mood) =>
    new Date(convertArrayToDate(mood.moodSetAt)).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  );
  const moodValues = moodData.map((mood) => moodMap[mood.moodId]?.yValue || 0);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Mood Progress",
        data: moodValues,
        fill: true,
        backgroundColor: "rgba(143, 136, 119, 0.15)",
        borderColor: "#8F8877",
        tension: 0.3,
        pointBackgroundColor: "#26241C",
        pointBorderColor: "#E2E3E3",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          color: "#656359",
        },
        grid: { color: "rgba(229, 229, 220, 0.8)" },
      },
      x: {
        ticks: { color: "#656359" },
        grid: { color: "rgba(229, 229, 220, 0.5)" },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sand">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="text-center mb-10">
            <span className="chip bg-taupe/15 text-taupe mb-4">
              <FaChartLine className="text-xs" /> Your journey
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
              Mood Progress
            </h2>
            <p className="text-stone">
              Watching your moods over time is a gentle act of self-awareness.
            </p>
          </div>

          <div className="card mb-8">
            <div className="chart-container relative mb-4">
              <Line data={data} options={options} />
            </div>
            <p className="text-center text-xs text-stone">
              Higher points on the graph indicate happier moods.
            </p>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold text-ink mb-5 flex items-center gap-2">
              <FaHeart className="text-taupe" /> Mood History
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-sand-deep/60">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-stone">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-stone">Mood</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-stone">Emoji</th>
                  </tr>
                </thead>
                <tbody>
                  {moodData.map((mood, index) => (
                    <tr key={index} className="border-b border-sand-deep/40 hover:bg-sand transition-colors">
                      <td className="py-3 px-4 text-sm text-stone">
                        {new Date(
                          convertArrayToDate(mood.moodSetAt)
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-ink">
                        {moodMap[mood.moodId]?.name || "Unknown Mood"}
                      </td>
                      <td className="py-3 px-4 text-2xl">
                        {moodMap[mood.moodId]?.emoji || "❓"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoodProgress;