import React, { useState, useEffect } from 'react';
import useChatStore from '../../store/chatStore';
import { useNavigate } from 'react-router-dom';

import ChatUser from './ChatUser';
import Logout from './Logout';
import LogoutConfirm from './LogoutConfirm';
import FindPeopleButton from './FindPeopleButton';


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
      <div className="flex flex-col flex-[0.35] min-w-[280px] max-w-[400px] h-full border-r border-base-200 bg-base-100 text-base-content px-6 py-8 gap-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl tracking-tight text-primary">Chats</h2>
          <FindPeopleButton onClick={() => navigate('/find-people')} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          {loadingChats ? (
            <div className="text-center text-base-content/50">Loading chats...</div>
          ) : chatError ? (
            <div className="text-center text-error">{chatError}</div>
          ) : acceptedChats.length === 0 ? (
            <div className="text-center text-base-content/50">No accepted chats yet</div>
          ) : (
            <div className="flex flex-col gap-2">
              {acceptedChats.map((user) => (
                <ChatUser
                  key={user._id}
                  user={{
                    ...user,
                    id: user._id,
                    name: user.username,
                    avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`,
                  }}
                  selected={selectedUser && (selectedUser._id === user._id || selectedUser.id === user._id)}
                  onClick={() => setSelectedUser(user)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="pt-4">
          <Logout onLogout={handleLogout} />
        </div>
      </div>
      <LogoutConfirm open={showLogout} onConfirm={handleConfirm} onCancel={handleCancel} />
    </>
  );
}

export default Left;
