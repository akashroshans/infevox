export default function CurriculumBreakdown({ curriculum }) {
  if (!curriculum) return null
  return (
    <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-text-primary">{curriculum.title}</h3>
          <p className="text-xs text-text-muted mt-0.5">{curriculum.subtitle}</p>
        </div>
        {curriculum.badge && (
          <span className="text-[11px] font-semibold text-text-secondary bg-surface border border-primary-100 px-2.5 py-1 rounded-lg whitespace-nowrap">
            {curriculum.badge}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {(curriculum.tracks || []).map((track) => (
          <div
            key={track.id}
            className="rounded-xl border border-primary-50 bg-surface p-5 hover:border-primary-100 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-lg ${track.numberColor || 'bg-primary-500'} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                  {track.number}
                </span>
                <h4 className="text-sm font-bold text-text-primary">{track.title}</h4>
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${track.modulesColor}`}>
                {track.modulesLabel}
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed mb-3 ml-9">{track.description}</p>
            <div className="flex flex-wrap gap-2 ml-9">
              {(track.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-text-secondary bg-surface-card border border-primary-100 px-2.5 py-1 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
