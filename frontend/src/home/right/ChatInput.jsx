import React, { useState } from "react";
import { FiSend, FiPaperclip, FiSmile } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";

function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = React.useRef();

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onSend({ file });
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-2 p-4 border-t border-gray-300 bg-white sticky bottom-0 z-10 relative"
    >
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
        onClick={() => setShowEmoji((v) => !v)}
        tabIndex={-1}
      >
        <FiSmile size={22} />
      </button>
      {showEmoji && (
        <div className="absolute bottom-16 left-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" height={350} width={300} />
        </div>
      )}
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
        onClick={() => fileInputRef.current.click()}
        tabIndex={-1}
      >
        <FiPaperclip size={20} />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
      />
      <button
        type="submit"
        className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition"
      >
        <FiSend size={20} />
      </button>
    </form>
  );
}

export default ChatInput;
