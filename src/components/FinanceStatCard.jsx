import { getIcon } from '../utils/icons'

// Icon component resolved via props (not created during render)
function CardIcon({ icon: Icon, size, className }) {
  if (!Icon) return null
  return <Icon size={size} className={className} />
}

export default function FinanceStatCard({ stat }) {
  return (
    <div className="bg-surface-card rounded-2xl p-5 border border-primary-50 shadow-sm hover:shadow-md hover:shadow-primary-100/40 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <CardIcon icon={getIcon(stat.icon)} size={20} className={stat.iconColor} />
        </div>
        <span className={`text-[11px] font-semibold ${stat.badgeColor} ${stat.badgeBg || 'bg-white'} px-2.5 py-0.5 rounded-full whitespace-nowrap`}>
          {stat.badge}
        </span>
      </div>
      <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">{stat.label}</p>
      <p className="text-2xl font-extrabold text-text-primary tracking-tight mb-1">{stat.value}</p>
      <p className="text-xs text-text-muted">{stat.subtitle}</p>
    </div>
  )
}
