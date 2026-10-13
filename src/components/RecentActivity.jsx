import { getIcon } from '../utils/icons'

function ActivityItem({ activity }) {
  const Icon = getIcon(activity.icon)

  return (
    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-primary-50/60 transition-all duration-200 group hover:bg-primary-100/60">
      <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
        {Icon && <Icon size={16} className={activity.iconColor} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-text-primary tracking-wide">{activity.type}</p>
        <p className="text-[11px] text-text-muted font-medium mt-0.5">
          {activity.branch} — {activity.location}
        </p>
        <p className="text-xs text-text-secondary mt-1 leading-relaxed line-clamp-2">
          {activity.description}
        </p>
      </div>
    </div>
  )
}

export default function RecentActivity({ activities }) {
  return (
    <div className="bg-surface-card rounded-2xl p-5 border border-primary-50 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-text-primary">Recent Activity</h3>
        <button className="text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors cursor-pointer">
          View All
        </button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 -mr-1 custom-scrollbar">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  )
}
