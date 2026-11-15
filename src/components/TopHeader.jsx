import { useLocation } from "react-router-dom"
import { Bell, ChevronRight, ShieldCheck } from "lucide-react"

const pageTitles = {
  "/dashboard": "Dashboard",
  "/visit-requests": "Visit Requests",
  "/visits": "Visits",
  "/volunteers": "Volunteers",
  "/chat": "Chat",
}

export default function TopHeader() {
  const { pathname } = useLocation()

  return (
    <header className="top-header">
      <div className="breadcrumb">
        <span>Overview</span>
        <ChevronRight size={12} />
        <span className="breadcrumb__current">{pageTitles[pathname]}</span>
      </div>

      <div className="top-header__right">
        <button className="bell-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="bell-btn__dot" />
        </button>

        <div className="top-header__divider" />

        {/* TODO (backend): replace with the logged-in user */}
        <div className="user">
          <div className="user__avatar">YB</div>
          <div>
            <p className="user__name">Youssef Bennani</p>
            <span className="user__role">
              <ShieldCheck size={11} />
              Staff Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
