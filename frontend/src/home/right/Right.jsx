

import React, { useEffect, useRef } from "react";
import useChatStore from '../../store/chatStore';
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL;

function Right() {
  const socketRef = useRef(null);
  const {
    selectedUser,
    messages,
    setMessages,
    addMessage
  } = useChatStore();


  // Fetch message history when selectedUser changes
  useEffect(() => {
    if (!selectedUser) return setMessages(selectedUser?._id, []);
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("accessToken");
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chats/messages/${selectedUser._id}`, {
          headers: { Authorization: token ? token : "" },
        });
        const data = await res.json();
        if (res.ok && data.data && Array.isArray(data.data.messages)) {
          setMessages(selectedUser._id, data.data.messages.map((msg) => ({
            ...msg,
            isMe: msg.sender && (msg.sender._id === undefined ? msg.sender === selectedUser._id : msg.sender._id !== selectedUser._id),
            text: msg.text || msg.message,
          })));
        } else {
          setMessages(selectedUser._id, []);
        }
      } catch {
        setMessages(selectedUser._id, []);
      }
    };
    fetchMessages();
  }, [selectedUser, setMessages]);

  // Socket.IO connection and real-time updates
  useEffect(() => {
    if (!selectedUser) return;
    if (!socketRef.current) {
      const token = localStorage.getItem("accessToken");
      socketRef.current = io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket"],
      });
    }
    const socket = socketRef.current;
    const handleReceive = (msg) => {
      if (msg.sender === selectedUser._id || msg.receiver === selectedUser._id) {
        addMessage(selectedUser._id, { ...msg, isMe: msg.sender !== selectedUser._id, text: msg.text || msg.message });
      }
    };
    socket.on("receive_message", handleReceive);
    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [selectedUser, addMessage]);

  const handleSend = (msg) => {
    if (!selectedUser || !msg) return;
    const socket = socketRef.current;
    if (typeof msg === "string") {
      socket.emit("send_message", { to: selectedUser._id, text: msg });
      addMessage(selectedUser._id, { text: msg, isMe: true });
    } else if (msg.file) {
      // File sending not implemented in backend yet
      alert("File sending not supported yet");
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex flex-col flex-1 h-full w-full bg-base-100 text-base-content items-center justify-center">
        <div className="text-base-content/50 text-lg">Select a user to start chatting</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full w-full bg-base-100 text-base-content rounded-xl shadow-card mx-2 my-4">
      <ChatHeader user={selectedUser} />
      <ChatMessages messages={messages[selectedUser._id] || []} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default Right;
