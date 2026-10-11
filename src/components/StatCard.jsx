import { getIcon, TrendingUp } from '../utils/icons'

export default function StatCard({ stat }) {
  const Icon = getIcon(stat.icon)

  return (
    <div className="bg-surface-card rounded-2xl p-5 border border-primary-50 shadow-sm hover:shadow-md hover:shadow-primary-100/40 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          {Icon && <Icon size={20} className={stat.iconColor} />}
        </div>
        <div className="flex items-center gap-1 text-success text-xs font-semibold bg-green-50 px-2 py-0.5 rounded-full">
          <TrendingUp size={12} />
          <span>{stat.change}</span>
        </div>
      </div>
      <p className="text-xs text-text-secondary font-medium mb-1">{stat.label}</p>
      <p className="text-3xl font-bold text-text-primary mb-3 tracking-tight">{stat.value.toLocaleString()}</p>
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span className="text-text-secondary">
            <span className="font-semibold text-text-primary">{stat.active.toLocaleString()}</span> Active
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-danger" />
          <span className="text-text-secondary">
            <span className="font-semibold text-text-primary">{stat.inactive.toLocaleString()}</span> Inactive
          </span>
        </div>
      </div>
    </div>
  )
}
