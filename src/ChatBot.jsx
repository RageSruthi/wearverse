// src/ChatBot.jsx
import { useEffect, useRef, useState } from "react";

const KB = [
  {
    keywords: ["sell", "upload", "list", "how do i sell", "seller"],
    answer: "To sell or rent out clothing, switch to Seller mode and click 'Upload'. Our AI inspects your photo, grades condition, and publishes it live to the marketplace!",
    nav: "Upload",
  },
  {
    keywords: ["rent", "rental", "calendar", "return date", "duration"],
    answer: "In the Rent section, select an outfit and tap 'Choose Dates'. Pick 3, 5, 7, 10, 15, or 30 days — return dates and fees calculate automatically!",
    nav: "Rent",
  },
  {
    keywords: ["recycle", "recycling", "damaged", "donate", "pickup"],
    answer: "If clothing is too damaged for resale, visit our Recycle section to schedule a free doorstep pickup for donation drives, fiber recycling, or agricultural crop protection.",
    nav: "Recycle",
  },
  {
    keywords: ["upcycle", "artisan", "custom bag", "patchwork"],
    answer: "Check out our Upcycle Studio! Our partner artisans turn old jeans and sarees into custom tote bags, jackets, and home decor.",
    nav: "Upcycle",
  },
  {
    keywords: ["cart", "checkout", "buy", "purchase", "payment"],
    answer: "Add items to your cart from Shop or Rent. Tap 'Proceed to Checkout' to place a demo order with zero real money charged!",
    nav: "Cart",
  },
  {
    keywords: ["order", "track", "status", "dashboard", "delivery"],
    answer: "View your order history, live delivery tracking timeline, and EcoPoints on your Buyer Dashboard!",
    nav: "Dashboard",
  },
];

const GREETING = "Hi! I'm the WearVerse Assistant. Ask me to find products, help sell, rent, recycle, track orders, or navigate!";
const FALLBACK = "I can help you search products, sell clothes, book rentals, schedule recycling, or track orders. What would you like to do?";

export default function ChatBot({ onTriggerSearch, setPage }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: GREETING }]);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  function processQuery(text) {
    const q = text.toLowerCase();

    // Check if query is a product search command e.g. "show me black frocks under 1500"
    if (q.includes("frock") || q.includes("saree") || q.includes("dress") || q.includes("denim") || q.includes("shirt") || q.includes("kurti") || q.includes("black") || q.includes("under")) {
      let queryStr = "";
      if (q.includes("frock")) queryStr = "frock";
      else if (q.includes("saree")) queryStr = "saree";
      else if (q.includes("denim")) queryStr = "denim";
      else if (q.includes("dress")) queryStr = "dress";
      else if (q.includes("kurti")) queryStr = "kurti";

      if (onTriggerSearch) {
        onTriggerSearch({ query: queryStr, maxPrice: q.includes("1500") ? 1500 : 10000 });
      }
      if (setPage) setPage("Shop");

      return `Sure! Navigating to Shop and searching for "${queryStr || text}"...`;
    }

    // Match Knowledge Base
    for (const kb of KB) {
      if (kb.keywords.some((kw) => q.includes(kw))) {
        if (kb.nav && setPage) setPage(kb.nav);
        return kb.answer;
      }
    }

    return FALLBACK;
  }

  function send() {
    const text = input.trim();
    if (!text) return;

    const botReply = processQuery(text);

    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      { from: "bot", text: botReply },
    ]);
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") send();
  }

  return (
    <div className="chatbot-root">
      {open && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <span>♻️ WearVerse Smart Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="chatbot-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-bubble ${m.from}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question or search e.g. 'black frocks under 1500'..."
            />
            <button onClick={send} aria-label="Send">➤</button>
          </div>
        </div>
      )}

      <button
        className="chatbot-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open support chat"
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}
