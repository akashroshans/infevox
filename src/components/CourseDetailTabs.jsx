export default function CourseDetailTabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="flex items-center gap-1.5 mb-6">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            onClick={() => onChange?.(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                : 'text-text-secondary hover:bg-surface-card hover:text-primary-600'
            }`}
          >
            {tab.label}
            {typeof tab.count !== 'undefined' && (
              <span
                className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
