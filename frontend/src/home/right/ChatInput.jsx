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
      className="flex items-center gap-2 p-5 border-t border-base-200 bg-base-100 sticky bottom-0 z-10 relative rounded-b-xl"
    >
      <button
        type="button"
        className="p-2 rounded-full hover:bg-base-200 text-base-content/70"
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
        className="p-2 rounded-full hover:bg-base-200 text-base-content/70"
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
        className="flex-1 px-5 py-3 rounded-full border border-base-200 focus:outline-none focus:ring-2 focus:ring-primary bg-base-200 text-base-content"
      />
      <button
        type="submit"
        className="p-2 rounded-full bg-primary hover:bg-primary-focus text-primary-content transition"
      >
        <FiSend size={20} />
      </button>
    </form>
  );
}

export default ChatInput;
