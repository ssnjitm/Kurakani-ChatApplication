import React, { useState, useEffect } from "react";
import Users from "./Users";
import FindPeopleSearchBar from "./FindPeopleSearchBar";
import ProfileSidebar from "./ProfileSidebar";
import BackToChatsButton from "./BackToChatsButton";
import IncomingRequestsList from "./IncomingRequestsList";
import SentRequestsList from "./SentRequestsList";
import ProfileEditForm from "./ProfileEditForm";
import useChatStore from '../../store/chatStore';

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
  const [tab, setTab] = useState("find");
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [refreshRequests, setRefreshRequests] = useState(0);
  const [profile, setProfile] = useState(getCurrentUser());

  const handleRequestsChanged = () => setRefreshRequests(r => r + 1);

  useEffect(() => {
    if (tab === "incoming" || tab === "sent" || tab === "find") {
      const fetchRequests = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const incomingRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat-requests/incoming`, {
            headers: { Authorization: token ? token : "" },
          });
          const incomingData = await incomingRes.json();
          setIncomingRequests(incomingRes.ok && incomingData.data ? incomingData.data.requests || [] : []);
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

  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat-requests/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token ? token : "" },
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
        headers: { "Content-Type": "application/json", Authorization: token ? token : "" },
        body: JSON.stringify({ requestId, action: "reject" }),
      });
      if (res.ok) setRefreshRequests(r => r + 1);
    } catch {}
  };

  let mainContent;
  if (tab === "find") {
    mainContent = (
      <div className="flex flex-col h-full rounded-2xl p-6 gap-4 bg-white/10 backdrop-blur-lg border border-white/30 shadow-lg">
        <FindPeopleSearchBar query={search} setQuery={setSearch} />
        <div className="flex-1 min-h-0 overflow-y-auto mt-2">
          <Users onSelectUser={setSelectedUser} search={search} onRequestsChanged={handleRequestsChanged} />
        </div>
      </div>
    );
  } else if (tab === "incoming") {
    mainContent = (
      <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl p-6 bg-white/10 backdrop-blur-lg border border-white/30 shadow-lg">
        <IncomingRequestsList requests={incomingRequests} onAccept={handleAccept} onReject={handleReject} />
      </div>
    );
  } else if (tab === "sent") {
    mainContent = (
      <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl p-6 bg-white/10 backdrop-blur-lg border border-white/30 shadow-lg">
        <SentRequestsList requests={sentRequests} />
      </div>
    );
  } else if (tab === "profile") {
    mainContent = (
      <div className="flex flex-col items-center justify-center h-full rounded-2xl p-6 bg-white/10 backdrop-blur-lg border border-white/30 shadow-lg">
        <ProfileEditForm user={profile} onSave={(data) => { setProfile(data); setTab("find"); }} />
      </div>
    );
  }

  return (
    <div className="flex h-[100vh] w-full bg-gradient-to-tr from-purple-600 to-blue-600 text-white">
      {/* Profile sidebar */}
      <div className="hidden md:flex flex-col min-w-[280px] max-w-[320px] h-full border-r border-white/30 bg-white/10 backdrop-blur-lg shadow-xl">
        <ProfileSidebar
          user={profile}
          onEdit={() => setTab("profile")}
          onLogout={() => { localStorage.removeItem('accessToken'); window.location.href = '/signin'; }}
          onViewRequests={() => setTab("incoming")}
          onViewSent={() => setTab("sent")}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full p-10">
        <div className="flex items-center gap-3 mb-6">
          <BackToChatsButton />
          <div className="tabs tabs-boxed bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
            <button className={`tab tab-lg font-semibold transition ${tab === "find" ? "tab-active text-white" : "text-white/70"}`} onClick={() => setTab("find")}>Find People</button>
            <button className={`tab tab-lg font-semibold transition ${tab === "incoming" ? "tab-active text-white" : "text-white/70"}`} onClick={() => setTab("incoming")}>Incoming</button>
            <button className={`tab tab-lg font-semibold transition ${tab === "sent" ? "tab-active text-white" : "text-white/70"}`} onClick={() => setTab("sent")}>Sent</button>
            <button className={`tab tab-lg font-semibold transition ${tab === "profile" ? "tab-active text-white" : "text-white/70"}`} onClick={() => setTab("profile")}>Profile</button>
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
