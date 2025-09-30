import { Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Left from './home/left/Left';
import Right from './home/right/Right';
import FindPeoplePage from './home/left/FindPeoplePage';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

function App() {
  return (
    <div data-theme="kurakani" className="min-h-screen bg-gradient-to-br from-primary to-secondary/70">
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className='flex h-screen'>
                <Left />
                <Right />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/find-people"
          element={
            <ProtectedRoute>
              <FindPeoplePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </div>
  );
}

export default App;
