// src/ChatBot.jsx
import { useEffect, useRef, useState } from "react";

const KB = [
  {
    keywords: ["sell", "upload", "list", "how do i sell", "seller"],
    answer: "To sell clothing, switch to Seller mode and click 'Upload'. Our AI scans your photo, detects condition (Good, Slightly Damaged, Severely Damaged), and routes it appropriately!",
    nav: "Upload",
  },
  {
    keywords: ["rent", "rental", "calendar", "return date", "duration"],
    answer: "In the Rent section, click 'Choose Dates & Rent'. Pick 3 to 30 days — return dates and fees calculate automatically!",
    nav: "Rent",
  },
  {
    keywords: ["recycle", "farmer", "agricultural", "donate", "pickup"],
    answer: "For unwearable or severely damaged clothes, our Recycle network routes them to Agricultural Farmers (for crop covering & mulch) or Donation drives with contact numbers!",
    nav: "Recycle",
  },
  {
    keywords: ["upcycle", "tailor", "torn", "alteration"],
    answer: "For slightly torn clothes, our Upcycle Studio connects you with local verified tailors along with their phone numbers and addresses!",
    nav: "Upcycle",
  },
  {
    keywords: ["cart", "checkout", "buy", "payment", "upi", "cod"],
    answer: "Add items to your cart from Shop or Rent. Tap 'Proceed to Payment' to choose UPI (PhonePe, GPay, Paytm, Razorpay demo), COD, or Card!",
    nav: "Cart",
  },
  {
    keywords: ["order", "track", "delivery", "dashboard", "courier"],
    answer: "View your active orders, rental history, and assigned delivery courier details (Ramesh Kumar - +91 98765 12345) on your Buyer Dashboard!",
    nav: "Dashboard",
  },
];

const GREETING = "Hello! I am your WearVerse Assistant. Ask me anything about searching frocks/sarees, renting, selling clothes, recycling to farmers, or tracking orders!";
const FALLBACK = "I can help you search products, sell clothes, book rentals, connect with local tailors or agricultural farmers, or track orders. What would you like to do?";

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

    if (q.includes("frock") || q.includes("saree") || q.includes("dress") || q.includes("denim") || q.includes("shirt") || q.includes("kurti") || q.includes("black")) {
      let queryStr = "";
      if (q.includes("frock")) queryStr = "frock";
      else if (q.includes("saree")) queryStr = "saree";
      else if (q.includes("denim")) queryStr = "denim";
      else if (q.includes("dress")) queryStr = "dress";
      else if (q.includes("kurti")) queryStr = "kurti";

      if (onTriggerSearch) {
        onTriggerSearch({ query: queryStr, maxPrice: 10000 });
      }
      if (setPage) setPage("Shop");

      return `Searching marketplace for "${queryStr || text}"... Navigating to Shop!`;
    }

    for (const kb of KB) {
      if (kb.keywords.some((kw) => q.includes(kw))) {
        if (kb.nav && setPage) setPage(kb.nav);
        return kb.answer;
      }
    }

    return FALLBACK;
  }

  function sendQuery(textToSend) {
    const text = textToSend || input.trim();
    if (!text) return;

    const botReply = processQuery(text);

    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      { from: "bot", text: botReply },
    ]);
    setInput("");
  }

  function send() {
    sendQuery();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") send();
  }

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}>
      {open && (
        <div
          style={{
            width: "360px",
            height: "500px",
            background: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid #e1ebe4",
            marginBottom: "12px",
          }}
        >
          {/* ChatGPT Style Header */}
          <div style={{ background: "#183f31", color: "white", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px" }}>🤖</span>
              <div>
                <strong style={{ display: "block", fontSize: "14px" }}>WearVerse AI Assistant</strong>
                <small style={{ color: "#9bb4a7", fontSize: "10px" }}>Powered by Circular Fashion AI</small>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>×</button>
          </div>

          {/* Messages Container */}
          <div ref={listRef} style={{ flex: 1, padding: "16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", background: "#f8faf9" }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                  maxWidth: "82%",
                  padding: "10px 14px",
                  borderRadius: m.from === "user" ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                  background: m.from === "user" ? "#174d39" : "#ffffff",
                  color: m.from === "user" ? "#ffffff" : "#26382f",
                  fontSize: "13px",
                  lineHeight: "1.4",
                  boxShadow: m.from === "bot" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                  border: m.from === "bot" ? "1px solid #e0e7e2" : "none",
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Suggested Quick Chips */}
          <div style={{ display: "flex", gap: "6px", padding: "8px 12px", background: "#ffffff", borderTop: "1px solid #eee", overflowX: "auto" }}>
            <button className="cat-pill" onClick={() => sendQuery("Show me frocks")}>👗 Frocks</button>
            <button className="cat-pill" onClick={() => sendQuery("How does renting work?")}>🗓️ Renting</button>
            <button className="cat-pill" onClick={() => sendQuery("Recycle to farmers")}>🌾 Farmers</button>
            <button className="cat-pill" onClick={() => sendQuery("Upload garment")}>📷 Sell</button>
          </div>

          {/* Input Bar */}
          <div style={{ display: "flex", padding: "10px 12px", background: "#ffffff", borderTop: "1px solid #eee", gap: "8px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or search e.g. 'black frocks'..."
              style={{ flex: 1, padding: "10px 14px", borderRadius: "20px", border: "1px solid #dce5df", outline: "none", fontSize: "12px" }}
            />
            <button onClick={send} style={{ background: "#174d39", color: "white", border: "none", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer" }}>➤</button>
          </div>
        </div>
      )}

      {/* Floating Bottom-Right Toggle Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#183f31",
          color: "white",
          border: "none",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          fontSize: "24px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
        }}
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}
