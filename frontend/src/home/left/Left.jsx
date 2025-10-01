import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "./User";
import Logout from "./Logout";
import LogoutConfirm from "./LogoutConfirm";
import useChatStore from "../../store/chatStore";

function Left() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const {
    acceptedChats, setAcceptedChats,
    loadingChats, setLoadingChats,
    chatError, setChatError,
    selectedUser, setSelectedUser
  } = useChatStore();

  // Fetch accepted chat partners (global)
  useEffect(() => {
    const fetchAcceptedChats = async () => {
      setLoadingChats(true);
      setChatError("");
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat-requests/accepted`, {
          headers: { Authorization: token ? token : "" },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch chats");
        setAcceptedChats(data.data.chats || []);
      } catch (err) {
        setChatError(err.message);
      } finally {
        setLoadingChats(false);
      }
    };
    fetchAcceptedChats();
  }, [setAcceptedChats, setLoadingChats, setChatError]);

  const handleLogout = () => setShowLogout(true);
  const handleCancel = () => setShowLogout(false);
  const handleConfirm = () => {
    setShowLogout(false);
    localStorage.removeItem('accessToken');
    navigate('/signin');
  };

  return (
    <>
      <div className="flex flex-col flex-[0.35] min-w-[280px] max-w-[400px] h-full bg-gradient-to-b from-indigo-700 to-purple-700 text-white px-6 py-8 gap-6 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
        
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-6">
          <User />
        </div>

        {/* Chat List */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {loadingChats ? (
            <div className="text-center text-white/70">Loading chats...</div>
          ) : chatError ? (
            <div className="text-center text-red-400">{chatError}</div>
          ) : acceptedChats.length === 0 ? (
            <div className="text-center text-white/70">No accepted chats yet</div>
          ) : (
            <div className="flex flex-col gap-2">
              {acceptedChats.map((user) => (
                <div
                  key={user._id}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-colors hover:bg-white/20 ${
                    selectedUser && (selectedUser._id === user._id || selectedUser.id === user._id)
                      ? "bg-white/20 text-white font-semibold"
                      : "text-white/80"
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover border border-white/30 shadow"
                  />
                  <span className="font-medium">{user.username}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout Section */}
        <div className="pt-4">
          <Logout />
        </div>
      </div>

      <LogoutConfirm open={showLogout} onConfirm={handleConfirm} onCancel={handleCancel} />
    </>
  );
}

export default Left;
