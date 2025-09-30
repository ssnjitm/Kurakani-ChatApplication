import React, { useRef, useEffect } from "react";

function ChatMessages({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 bg-base-100 rounded-b-xl">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.isMe ? "justify-end" : "justify-start"} mb-3"`}
        >
          <div
            className={`max-w-xs px-5 py-3 rounded-2xl shadow-card text-sm break-words font-medium ${
              msg.isMe
                ? "bg-primary text-primary-content rounded-br-none"
                : "bg-base-200 text-base-content rounded-bl-none"
            }`}
          >
            {msg.text && <span>{msg.text}</span>}
            {msg.fileUrl && (
              <a
                href={msg.fileUrl}
                download={msg.fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-xs underline text-primary-content/80 hover:text-primary-content"
              >
                {msg.file.type.startsWith('image') ? (
                  <img src={msg.fileUrl} alt={msg.fileName} className="max-h-32 max-w-full rounded mt-1" />
                ) : (
                  <span>📎 {msg.fileName}</span>
                )}
              </a>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;
