import { NavLink } from 'react-router-dom'
import { getIcon, LogOut } from '../utils/icons'

const linkClass = ({ isActive }) =>
  `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
    ${
      isActive
        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
        : 'text-text-secondary hover:bg-primary-50 hover:text-primary-600'
    }`

export default function Sidebar({ items }) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-56 bg-surface-card border-r border-primary-100/50 flex flex-col z-30">
      {/* Logo */}
      <NavLink to="/dashboard" className="flex items-center gap-2.5 px-5 py-6">
        <div className="w-9 h-9 rounded-lg bg-primary-500 flex items-center justify-center">
          <span className="text-white font-bold text-lg">X</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-text-primary tracking-tight leading-none">infevox</span>
          <span className="text-[9px] font-semibold text-text-muted tracking-[0.15em] uppercase">Academy</span>
        </div>
      </NavLink>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-2">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = getIcon(item.icon)
            return (
              <li key={item.id}>
                <NavLink to={`/${item.id}`} className={linkClass}>
                  {Icon && <Icon size={18} />}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6">
        <button className="flex items-center gap-3 px-4 py-2.5 text-danger text-sm font-medium hover:bg-red-50 rounded-xl transition-all duration-200 w-full cursor-pointer">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
