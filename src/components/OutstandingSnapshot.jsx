import { Send } from '../utils/icons'

export default function OutstandingSnapshot({ data, onRemind }) {
  if (!data) return null

  return (
    <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-base font-bold text-text-primary">{data.title}</h3>
        <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2.5 py-1 rounded-lg whitespace-nowrap">
          {data.totalDueLabel}
        </span>
      </div>

      {/* Due cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {(data.cards || []).map((card) => (
          <div key={card.id} className={`rounded-xl p-4 ${card.bgColor}`}>
            <p className="text-[11px] font-medium text-text-secondary mb-1">{card.label}</p>
            <p className={`text-lg font-extrabold ${card.textColor}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Audit log */}
      <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase">{data.auditTitle}</p>
      <p className="text-[11px] text-text-muted mb-3">{data.auditSubtitle}</p>
      <div className="space-y-3 flex-1">
        {(data.auditLog || []).map((entry) => (
          <div key={entry.id} className="flex items-start gap-2.5">
            <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${entry.color}`} />
            <p className="text-xs text-text-secondary leading-relaxed">{entry.text}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onRemind}
        className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-primary-500 rounded-xl hover:bg-primary-600 shadow-md shadow-primary-500/25 transition-all duration-200 cursor-pointer"
      >
        <Send size={14} />
        {data.remindLabel}
      </button>
    </div>
  )
}
