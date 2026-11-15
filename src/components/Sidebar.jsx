import { NavLink } from "react-router-dom"
import {
  GraduationCap,
  LayoutGrid,
  Inbox,
  CalendarDays,
  Users,
  MessageSquare,
  LogOut,
} from "lucide-react"

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/visit-requests", label: "Visit Requests", icon: Inbox, badge: 5 },
  { to: "/visits", label: "Visits", icon: CalendarDays },
  { to: "/volunteers", label: "Volunteers", icon: Users },
  { to: "/chat", label: "Chat", icon: MessageSquare },
]

export default function Sidebar() {
  function handleLogout() {
    // TODO (backend): log the user out
  }

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar__brand">
          <div className="sidebar__logo">
            <GraduationCap size={20} />
          </div>
          <span className="sidebar__name">SchoolVisit</span>
        </div>

        <nav className="sidebar__nav">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
              >
                <Icon size={16} />
                <span>{link.label}</span>
                {link.badge && <span className="nav-link__badge">{link.badge}</span>}
              </NavLink>
            )
          })}
        </nav>
      </div>

      <div className="sidebar__footer">
        <button className="nav-link nav-link--logout" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
