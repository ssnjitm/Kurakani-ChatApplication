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
    <Routes>
      <Route path="/signin" element={
        <div data-theme="kurakani" className="min-h-screen bg-base-200 flex items-center justify-center">
          <Signin />
        </div>
      } />
      <Route path="/signup" element={
        <div data-theme="kurakani" className="min-h-screen bg-base-200 flex items-center justify-center">
          <Signup />
        </div>
      } />
      <Route path="/*" element={
        <div data-theme="kurakani" className="min-h-screen flex flex-col bg-gradient-to-br from-base-100 via-base-200 to-base-300">
          {/* Top Navigation Bar */}
          <nav className="sticky top-0 z-20 w-full bg-white border-b border-base-200 px-8 py-4 flex items-center justify-between shadow-2xl rounded-b-3xl">
            <div className="flex items-center gap-4">
              <span className="font-display text-4xl font-extrabold text-primary tracking-tight">Kurakani</span>
            </div>
            <div className="flex items-center gap-6">
              {/* Add navigation links or icons here if needed */}
            </div>
          </nav>
          <main className="flex flex-1 w-full">
            {/* Sidebar (Instagram style) */}
            <aside className="hidden md:flex flex-col min-w-[320px] max-w-[360px] h-full bg-white border-r border-base-200 shadow-2xl rounded-r-3xl">
              <Left />
            </aside>
            {/* Main Content */}
            <section className="flex-1 flex flex-col h-full">
              <Routes>
                <Route path="/" element={<ProtectedRoute><Right /></ProtectedRoute>} />
                <Route path="/find-people" element={<ProtectedRoute><FindPeoplePage /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/signin" />} />
              </Routes>
            </section>
          </main>
        </div>
      } />
    </Routes>
  );
}

export default App;
