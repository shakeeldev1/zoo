import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppContext } from "../../context/ContextApi";
import { MessageCircle, X, Send } from "lucide-react";
import axios from "axios";

const ChatBot = () => {
  const { user } = useAppContext();
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const messageEndRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello ${user?.name ? user.name : "there"}! I am your Zoo AI Assistant. Ask me anything about the zoo website, your profile, cart, animals, or tickets.`,
    },
  ]);

  const cartCount = cartItems.reduce((total, item) => total + (item.cartQuantity || 0), 0);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://localhost:5000/v7/api/ai/chat", {
        question,
        userName: user?.name || "Guest",
        cartCount,
        cartItems: cartItems.map((item) => ({
          name: item.name || item.title || "Animal",
          quantity: item.cartQuantity || 1,
        })),
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.answer || "I am here to help, but I did not get a proper response.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I am unable to answer right now. Please try again later.",
        },
      ]);
    }

    setQuestion("");
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300">
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-32px)] h-[540px] md:h-[520px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
          <div className="bg-emerald-600 text-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-lg">Zoo AI Assistant</h2>
                <p className="text-sm opacity-90">Professional help for the zoo website.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-3xl shadow-sm ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white"
                      : "bg-white border border-slate-200 text-slate-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <div className="p-3 border-t border-slate-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask a question about the zoo website..."
                className="flex-1 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-white shadow-lg hover:bg-emerald-700 transition-colors duration-200"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Ask about cart items, profile, tickets, or zoo features.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;