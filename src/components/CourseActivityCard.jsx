export default function CourseActivityCard({ activity }) {
  if (!activity) return null
  return (
    <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm p-6">
      <h3 className="text-base font-bold text-text-primary">{activity.title}</h3>
      <p className="text-xs text-text-muted mt-0.5 mb-5">{activity.subtitle}</p>

      <div className="space-y-5">
        {(activity.items || []).map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.color || 'bg-primary-500'}`} />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-text-primary leading-snug">{item.title}</p>
              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
