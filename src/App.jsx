import { Routes, Route, Navigate } from "react-router-dom"
import AdminLayout from "./components/AdminLayout"
import ChatPage from "./pages/ChatPage"
import SupportPage from "./pages/SupportPage"

// Sidebar links that don't have a page yet
function ComingSoon() {
  return <p className="coming-soon">This page hasn't been built yet.</p>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chat" replace />} />

      {/* Page 2: visitor page with the floating chat widget */}
      <Route path="/support" element={<SupportPage />} />

      {/* Page 1: staff area. Sidebar + header wrap every page inside this route */}
      <Route element={<AdminLayout />}>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/dashboard" element={<ComingSoon />} />
        <Route path="/visit-requests" element={<ComingSoon />} />
        <Route path="/visits" element={<ComingSoon />} />
        <Route path="/volunteers" element={<ComingSoon />} />
      </Route>
    </Routes>
  )
}
