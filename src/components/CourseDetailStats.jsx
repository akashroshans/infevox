import { getIcon, TrendingUp } from '../utils/icons'

export default function CourseDetailStats({ stats = [] }) {
  return (
    <div className="grid grid-cols-4 gap-5 mb-6">
      {stats.map((stat) => {
        const Icon = getIcon(stat.icon)
        return (
          <div
            key={stat.id}
            className="bg-surface-card rounded-2xl p-5 border border-primary-50 shadow-sm hover:shadow-md hover:shadow-primary-100/40 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                {Icon && <Icon size={20} className={stat.iconColor} />}
              </div>
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${stat.badgeBg || 'bg-primary-50'} ${stat.badgeColor}`}>
                {stat.id === 'enrolled-students' && <TrendingUp size={11} />}
                {stat.badge}
              </span>
            </div>
            <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">{stat.label}</p>
            <p className="text-3xl font-extrabold text-text-primary tracking-tight mb-1">{stat.value}</p>
            <p className="text-xs text-text-muted">{stat.subtitle}</p>
          </div>
        )
      })}
    </div>
  )
}
