

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

function Right({ user, messages, onSend }) {
  if (!user) {
    return (
      <div className="flex flex-col flex-1 h-full w-full bg-slate-100 text-gray-900 items-center justify-center">
        <div className="text-gray-400 text-lg">Select a user to start chatting</div>
      </div>
    );
  }
  // Wrap onSend to handle file messages
  const handleSend = (msg) => {
    if (typeof msg === 'object' && msg.file) {
      // Convert file to URL for preview
      const fileUrl = URL.createObjectURL(msg.file);
      onSend({ file: msg.file, fileUrl, fileName: msg.file.name, isMe: true });
    } else {
      onSend(msg);
    }
  };
  return (
    <div className="flex flex-col flex-1 h-full w-full bg-slate-100 text-gray-900">
      <ChatHeader user={user} />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default Right;
