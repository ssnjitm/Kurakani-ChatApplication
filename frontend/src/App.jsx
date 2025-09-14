

import { Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';
// ProtectedRoute component
function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check for token in localStorage (customize as needed)
    const token = localStorage.getItem('accessToken');
    setIsAuth(!!token);
  }, []);

  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
import Left from './home/left/Left';
import Right from './home/right/Right';
function App() {
  // Per-user chat state
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState({});

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // Optionally, initialize chat if not present
    setChats((prev) => prev[user.id] ? prev : { ...prev, [user.id]: [] });
  };

  const handleSendMessage = (msg) => {
    if (!selectedUser) return;
    setChats((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), { text: msg, isMe: true }],
    }));
  };

  return ( 
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div className='flex h-screen'>
              <Left selectedUser={selectedUser} onSelectUser={handleSelectUser} />
              <Right
                user={selectedUser}
                messages={selectedUser ? chats[selectedUser.id] || [] : []}
                onSend={handleSendMessage}
              />
            </div>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  ); 
}

export default App;
