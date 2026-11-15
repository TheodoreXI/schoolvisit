import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import TopHeader from "./TopHeader"

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <TopHeader />
        <main className="admin-content">
          {/* The current page (ChatPage, ...) is rendered here */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}
