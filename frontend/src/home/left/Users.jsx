import React, { useEffect, useState } from "react";
import ChatUser from "./ChatUser";
import useChatStore from '../../store/chatStore';
import { useNavigate } from 'react-router-dom';

// Helper to get current user ID from token (simple base64 decode, not secure)
function getCurrentUserId() {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.id || payload._id || payload.sub;
  } catch {
    return null;
  }
}

function Users({ selectedUserId, onSelectUser, search, onRequestsChanged }) {
  const { setSelectedUser, acceptedChats } = useChatStore();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]); // requests sent to me
  const [sentRequests, setSentRequests] = useState([]); // requests I sent
  const [sendingRequestId, setSendingRequestId] = useState(null); // userId being requested
  const [refreshRequests, setRefreshRequests] = useState(0); // trigger refetch
  const currentUserId = getCurrentUserId();


  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("accessToken");
  const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/users`);
        if (search) url.searchParams.set("search", search);
        const res = await fetch(url, {
          headers: {
            Authorization: token ? token : "",
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch users");
        setUsers(data.data.users || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [search]);

  // Fetch chat requests (pending and sent)
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // Get incoming requests
  const incomingRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat-requests/incoming`, {
          headers: { Authorization: token ? token : "" },
        });
        const incomingData = await incomingRes.json();
        setPendingRequests(incomingRes.ok && incomingData.data ? incomingData.data.requests || [] : []);
        // Get sent requests (optional: implement a /sent endpoint or filter from all requests)
        // For now, leave sentRequests empty or implement if backend supports
      } catch {}
    };
    fetchRequests();
  }, [refreshRequests]);

  // Send chat request
  const handleRequestChat = async (userId) => {
    setSendingRequestId(userId);
    try {
      const token = localStorage.getItem("accessToken");
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat-requests/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
        body: JSON.stringify({ to: userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send request");
  setRefreshRequests(r => r + 1); // refetch requests
  if (onRequestsChanged) onRequestsChanged();
    } catch (err) {
      alert(err.message);
    } finally {
      setSendingRequestId(null);
    }
  };

  // Accept/reject chat request
  const handleRespondRequest = async (requestId, action) => {
    try {
      const token = localStorage.getItem("accessToken");
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat-requests/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
        body: JSON.stringify({ requestId, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to respond");
  setRefreshRequests(r => r + 1); // refetch requests
  if (onRequestsChanged) onRequestsChanged();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="text-center text-gray-400">Loading users...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-3">
      {/* Pending requests to me */}
      {pendingRequests.length > 0 && (
        <div className="mb-2">
          <h4 className="text-xs text-gray-400 mb-1">Pending Chat Requests</h4>
          {pendingRequests.map((req) => (
            <div key={req._id} className="flex items-center gap-2 bg-warning/20 p-2 rounded mb-1 border border-warning/30">
              <span className="flex-1 text-warning-content text-sm font-medium">{req.fromUser?.username || req.from?.username || "User"}</span>
              <button
                className="btn btn-xs btn-success"
                onClick={() => handleRespondRequest(req._id, "accept")}
              >Accept</button>
              <button
                className="btn btn-xs btn-error"
                onClick={() => handleRespondRequest(req._id, "reject")}
              >Reject</button>
            </div>
          ))}
        </div>
      )}
      {/* User list with Chat or Request Chat button */}
      {users.map((user) => {
        if (user._id === currentUserId) return null; // skip self
        const isFriend = acceptedChats.some((c) => (c.user1?._id === user._id || c.user2?._id === user._id));
        if (isFriend) {
          return (
            <div key={user._id} className="relative group bg-base-100 border border-base-200 rounded-xl shadow-card flex items-center px-4 py-2 mb-1 hover:shadow-lg transition">
              <ChatUser
                user={{
                  ...user,
                  id: user._id,
                  name: user.username,
                  avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`,
                }}
                selected={user._id === selectedUserId}
                onClick={() => (onSelectUser ? onSelectUser(user) : setSelectedUser(user))}
              />
              <button
                className="ml-auto btn btn-sm btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(user);
                  navigate('/');
                }}
              >Chat</button>
            </div>
          );
        }
        // Not a friend, show request logic
        const alreadySent = sentRequests.some((r) => r.to === user._id || r.toUser?._id === user._id);
        return (
          <div key={user._id} className="relative group bg-base-100 border border-base-200 rounded-xl shadow-card flex items-center px-4 py-2 mb-1 hover:shadow-lg transition">
            <ChatUser
              user={{
                ...user,
                id: user._id,
                name: user.username,
                avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`,
              }}
              selected={user._id === selectedUserId}
              onClick={() => (onSelectUser ? onSelectUser(user) : setSelectedUser(user))}
            />
            {!alreadySent ? (
              <button
                className={`ml-auto btn btn-sm btn-accent ${sendingRequestId === user._id ? 'opacity-60 cursor-not-allowed' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!sendingRequestId) handleRequestChat(user._id);
                }}
                disabled={!!sendingRequestId}
              >{sendingRequestId === user._id ? 'Sending...' : 'Request Chat'}</button>
            ) : (
              <span className="ml-auto px-2 py-1 text-xs bg-gray-400 text-white rounded opacity-80">Requested</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Users;
