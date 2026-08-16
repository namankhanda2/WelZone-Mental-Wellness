import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const affirmations = [
  "You are doing the best you can, and that is enough.",
  "Your feelings are valid, and it's okay to take time for yourself.",
  "You deserve to feel loved and supported.",
  "Every day is a new opportunity to grow.",
  "You are stronger than you think.",
  "It's okay to ask for help when you need it.",
  "You are worthy of good things.",
  "Your journey matters, and it's unique to you.",
  "Taking care of yourself is a strength, not a weakness.",
  "You have the courage to face anything that comes your way.",
];

const AffirmationDisplay = () => {
  const [randomAffirmation, setRandomAffirmation] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setRandomAffirmation(affirmations[randomIndex]);
  }, []);

  return (
    <div className="bg-sand-warm/60 rounded-2xl p-8 text-center max-w-2xl mx-auto">
      <span className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-taupe/15 text-taupe flex items-center justify-center text-xl">
        <FaQuoteLeft />
      </span>
      <h2 className="font-display text-lg font-semibold text-ink mb-4">
        Your Daily Affirmation
      </h2>
      <p className="text-lg text-ink italic leading-relaxed font-medium">
        &ldquo;{randomAffirmation}&rdquo;
      </p>
      <p className="text-xs text-stone mt-4">A gentle reminder, just for you</p>
    </div>
  );
};

export default AffirmationDisplay;