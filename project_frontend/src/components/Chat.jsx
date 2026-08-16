import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaHeart, FaSmile, FaComment } from "react-icons/fa";
import Header from "./Header";

const suggestions = [
  "I'm feeling anxious today",
  "Help me calm down",
  "I want a breathing exercise",
  "Tell me a positive affirmation",
];

const responses = [
  "I hear you. It's completely okay to feel this way — your feelings are valid and important.",
  "Let's take a slow, gentle breath together. Breathe in for 4 counts... hold... and out for 4 counts. You're doing great.",
  "You deserve kindness today. Remember: you are doing the best you can, and that is enough.",
  "I'm here with you. Would it help to talk a little more about what's on your mind?",
  "Small steps count. You've already shown courage by reaching out today.",
];

const autoReply = (msg) => {
  const lower = msg.toLowerCase();
  if (lower.includes("anxious") || lower.includes("anxiety")) {
    return "Anxiety is heavy, and I'm glad you shared it with me. Let's ground ourselves — take three slow breaths and tell me what you can see around you.";
  }
  if (lower.includes("calm") || lower.includes("breathe") || lower.includes("breathing")) {
    return "Let's do a 4-7-8 breathing exercise together: breathe in through your nose for 4 counts, hold for 7, and exhale slowly for 8. Repeat with me. 🌿";
  }
  if (lower.includes("sad") || lower.includes("down")) {
    return "I'm really sorry you're feeling down. It takes strength to admit that. You're not alone in this moment — I'm right here with you.";
  }
  if (lower.includes("affirmation") || lower.includes("positive")) {
    return "Here's a gentle affirmation for you: \"You are worthy of good things, exactly as you are right now.\" Say it softly to yourself. 💛";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! I'm Mira, your WelZone companion. How are you feeling today? Be as honest as you like — this is your safe space.";
  }
  return responses[Math.floor(Math.random() * responses.length)];
};

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      from: "mira",
      text: "Hi, I'm Mira — your AI companion. I'm here to listen without judgment. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const message = text.trim();
    if (!message) return;

    setMessages((prev) => [...prev, { from: "me", text: message }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "mira", text: autoReply(message) }]);
      setTyping(false);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-sand">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Chat Header */}
          <div className="bg-ink rounded-t-3xl text-sand p-6 flex items-center gap-4 shadow-soft">
            <span className="h-14 w-14 rounded-2xl bg-gradient-to-br from-taupe to-taupe-soft flex items-center justify-center text-2xl animate-pulse-soft">
              <FaRobot />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-xl font-semibold">Mira · AI Companion</h2>
              <p className="text-sm text-stone-warm flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-leaf-soft animate-pulse" />
                Always here for you
              </p>
            </div>
            <span className="hidden sm:flex items-center gap-2 rounded-full bg-ink-soft px-4 py-2 text-xs text-stone-warm">
              <FaHeart className="text-taupe-soft" /> Private & safe
            </span>
          </div>

          {/* Messages */}
          <div className="bg-white border-x border-sand-deep/60 p-6 space-y-5 min-h-[50vh] max-h-[55vh] overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-card ${
                    msg.from === "me"
                      ? "bg-taupe text-white rounded-br-sm"
                      : "bg-sand-warm text-ink rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-sand-warm rounded-2xl rounded-bl-sm px-5 py-3.5 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-taupe animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-taupe animate-bounce [animation-delay:0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-taupe animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="bg-white border-x border-b border-sand-deep/60 px-6 pb-4 flex gap-2 flex-wrap">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="flex items-center gap-2 rounded-full border border-sand-deep bg-sand px-4 py-2 text-xs font-medium text-ink hover:border-taupe hover:bg-sand-warm transition-colors"
              >
                <FaSmile className="text-taupe" /> {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-b-3xl border border-sand-deep/60 p-4 flex items-center gap-3 shadow-soft"
          >
            <FaComment className="text-taupe text-xl ml-2" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share how you're feeling..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
            />
            <button
              type="submit"
              className="h-11 w-11 rounded-full bg-ink text-sand flex items-center justify-center hover:bg-taupe transition-colors"
              aria-label="Send"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </form>

          <p className="text-center text-xs text-stone mt-6">
            Mira is a supportive companion, not a substitute for professional help.
          </p>
        </div>
      </div>
    </>
  );
};

export default Chat;