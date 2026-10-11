import { Bell, ChevronLeft, User, RefreshCw } from '../utils/icons'

export default function Header({ title, subtitle, userName, userRole, showGreeting = true }) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-full bg-surface-card border border-primary-100 flex items-center justify-center text-text-secondary hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 shadow-sm cursor-pointer">
          <ChevronLeft size={16} />
        </button>
        <div>
          {showGreeting ? (
            <h1 className="text-2xl font-bold text-text-primary">
              {getGreeting()}, {userName} <span className="inline-block ml-1">👋</span>
            </h1>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
              {subtitle && (
                <p className="text-sm text-text-muted mt-0.5">{subtitle}</p>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="px-4 py-1.5 bg-primary-500 text-white text-xs font-semibold rounded-full shadow-md shadow-primary-500/25">
          {userRole}
        </span>
        <button className="w-9 h-9 rounded-full bg-surface-card border border-primary-100 flex items-center justify-center text-text-secondary hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 shadow-sm relative cursor-pointer">
          <RefreshCw size={17} />
        </button>
        <button className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 hover:bg-primary-200 transition-all duration-200 cursor-pointer">
          <User size={18} />
        </button>
      </div>
    </header>
  )
}
