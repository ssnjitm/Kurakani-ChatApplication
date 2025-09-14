import React, { useRef, useEffect } from "react";

function ChatMessages({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4 bg-slate-50">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.isMe ? "justify-end" : "justify-start"} mb-2`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm break-words ${
              msg.isMe
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-200 text-gray-900 rounded-bl-none"
            }`}
          >
            {msg.text && <span>{msg.text}</span>}
            {msg.fileUrl && (
              <a
                href={msg.fileUrl}
                download={msg.fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-xs underline text-blue-200 hover:text-blue-100"
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
