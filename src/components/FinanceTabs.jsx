export default function FinanceTabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="flex items-center gap-1.5 mb-6 flex-wrap">
      {tabs.map((tab) => {
        const isActive = tab === activeTab
        return (
          <button
            key={tab}
            onClick={() => onChange?.(tab)}
            className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                : 'text-text-secondary hover:bg-surface-card hover:text-primary-600'
            }`}
          >
            {tab}
          </button>
        )
      })}
    </div>
  )
}
