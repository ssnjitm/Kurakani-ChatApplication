
import React, { useEffect, useState } from "react";
import ChatUser from "./ChatUser";
import useChatStore from '../../store/chatStore';


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
  const { setSelectedUser } = useChatStore();
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
            <div key={req._id} className="flex items-center gap-2 bg-yellow-100 p-2 rounded mb-1">
              <span className="flex-1 text-gray-800 text-sm">{req.fromUser?.username || req.from?.username || "User"}</span>
              <button
                className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handleRespondRequest(req._id, "accept")}
              >Accept</button>
              <button
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleRespondRequest(req._id, "reject")}
              >Reject</button>
            </div>
          ))}
        </div>
      )}
      {/* User list with Request Chat button */}
      {users.map((user) => {
        if (user._id === currentUserId) return null; // skip self
        const alreadySent = sentRequests.some((r) => r.to === user._id || r.toUser?._id === user._id);
        return (
          <div key={user._id} className="relative group">
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
            {/* Request Chat button */}
            {!alreadySent && (
              <button
                className={`absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-blue-500 text-white rounded shadow hover:bg-blue-600 opacity-90 group-hover:opacity-100 ${sendingRequestId === user._id ? 'opacity-60 cursor-not-allowed' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!sendingRequestId) handleRequestChat(user._id);
                }}
                disabled={!!sendingRequestId}
              >{sendingRequestId === user._id ? 'Sending...' : 'Request Chat'}</button>
            )}
            {alreadySent && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-gray-400 text-white rounded opacity-80">Requested</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Users;
