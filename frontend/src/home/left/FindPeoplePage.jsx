import React, { useState, useEffect } from "react";
import Users from "./Users";
import FindPeopleSearchBar from "./FindPeopleSearchBar";
import ProfileSidebar from "./ProfileSidebar";
import BackToChatsButton from "./BackToChatsButton";
import IncomingRequestsList from "./IncomingRequestsList";
import SentRequestsList from "./SentRequestsList";
import ProfileEditForm from "./ProfileEditForm";
import useChatStore from '../../store/chatStore';

// Dummy current user for sidebar (replace with real user data from context/auth)
function getCurrentUser() {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return {};
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      name: payload.username || payload.name || "User",
      email: payload.email || "",
      avatar: payload.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.username || payload.name || "User")}`,
    };
  } catch {
    return {};
  }
}

function FindPeoplePage() {
  const { setSelectedUser } = useChatStore();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("find"); // find | incoming | sent | profile
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [refreshRequests, setRefreshRequests] = useState(0);
  const [profile, setProfile] = useState(getCurrentUser());

  // Callback to trigger refresh from Users component
  const handleRequestsChanged = () => setRefreshRequests(r => r + 1);

  // Fetch chat requests for incoming/sent tabs
  useEffect(() => {
    if (tab === "incoming" || tab === "sent" || tab === "find") {
      const fetchRequests = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          // Get incoming requests
          const incomingRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat-requests/incoming`, {
            headers: { Authorization: token ? token : "" },
          });
          const incomingData = await incomingRes.json();
          setIncomingRequests(incomingRes.ok && incomingData.data ? incomingData.data.requests || [] : []);
          // Get sent requests from backend
          const sentRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat-requests/sent`, {
            headers: { Authorization: token ? token : "" },
          });
          const sentData = await sentRes.json();
          setSentRequests(sentRes.ok && sentData.data ? sentData.data.requests || [] : []);
        } catch {}
      };
      fetchRequests();
    }
  }, [tab, refreshRequests]);

  // Accept/reject handlers
  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem("accessToken");
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat-requests/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
        body: JSON.stringify({ requestId, action: "accept" }),
      });
      if (res.ok) setRefreshRequests(r => r + 1);
    } catch {}
  };
  const handleReject = async (requestId) => {
    try {
      const token = localStorage.getItem("accessToken");
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat-requests/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
        body: JSON.stringify({ requestId, action: "reject" }),
      });
      if (res.ok) setRefreshRequests(r => r + 1);
    } catch {}
  };

  // Tab content rendering
  let mainContent;
  if (tab === "find") {
    mainContent = (
      <div className="flex flex-col h-full bg-base-100 rounded-2xl shadow-card border border-base-200 p-6 gap-4">
        <FindPeopleSearchBar query={search} setQuery={setSearch} />
        <div className="flex-1 min-h-0 overflow-y-auto mt-2">
          <Users onSelectUser={setSelectedUser} search={search} onRequestsChanged={handleRequestsChanged} />
        </div>
      </div>
    );
  } else if (tab === "incoming") {
    mainContent = (
      <div className="flex-1 min-h-0 overflow-y-auto bg-base-100 rounded-2xl shadow-card border border-base-200 p-6">
        <IncomingRequestsList requests={incomingRequests} onAccept={handleAccept} onReject={handleReject} />
      </div>
    );
  } else if (tab === "sent") {
    mainContent = (
      <div className="flex-1 min-h-0 overflow-y-auto bg-base-100 rounded-2xl shadow-card border border-base-200 p-6">
        <SentRequestsList requests={sentRequests} />
      </div>
    );
  } else if (tab === "profile") {
    mainContent = (
      <div className="flex flex-col items-center justify-center h-full bg-base-100 rounded-2xl shadow-card border border-base-200 p-6">
        <ProfileEditForm user={profile} onSave={(data) => { setProfile(data); setTab("find"); }} />
      </div>
    );
  }

  return (
    <div className="flex h-[100vh] w-full bg-base-200 text-base-content">
      {/* Profile sidebar */}
      <div className="hidden md:flex flex-col min-w-[260px] max-w-[320px] h-full border-r border-base-200 bg-base-100">
        <ProfileSidebar
          user={profile}
          onEdit={() => setTab("profile")}
          onLogout={() => { localStorage.removeItem('accessToken'); window.location.href = '/signin'; }}
          onViewRequests={() => setTab("incoming")}
          onViewSent={() => setTab("sent")}
        />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col h-full p-10 bg-base-200">
        <div className="flex items-center gap-3 mb-6">
          <BackToChatsButton />
          <div className="tabs tabs-boxed bg-base-100 shadow-card rounded-xl">
            <button
              className={`tab tab-lg font-semibold transition ${tab === "find" ? "tab-active text-primary" : "text-base-content/70"}`}
              onClick={() => setTab("find")}
            >Find People</button>
            <button
              className={`tab tab-lg font-semibold transition ${tab === "incoming" ? "tab-active text-primary" : "text-base-content/70"}`}
              onClick={() => setTab("incoming")}
            >Incoming</button>
            <button
              className={`tab tab-lg font-semibold transition ${tab === "sent" ? "tab-active text-primary" : "text-base-content/70"}`}
              onClick={() => setTab("sent")}
            >Sent</button>
            <button
              className={`tab tab-lg font-semibold transition ${tab === "profile" ? "tab-active text-secondary" : "text-base-content/70"}`}
              onClick={() => setTab("profile")}
            >Profile</button>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          {mainContent}
        </div>
      </div>
    </div>
  );
}

export default FindPeoplePage;
