import { PencilLine } from '../utils/icons'

function FieldValue({ field }) {
  if (field.type === 'pill') {
    return (
      <span className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-lg ${field.pillColor || 'bg-primary-50 text-primary-600'}`}>
        {field.value}
      </span>
    )
  }
  if (field.type === 'dot') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${field.textColor || 'text-text-primary'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${field.dotColor || 'bg-success'}`} />
        {field.value}
      </span>
    )
  }
  if (field.type === 'textStrong') {
    return <p className="text-sm font-bold text-text-primary">{field.value}</p>
  }
  return <p className="text-sm font-semibold text-text-primary">{field.value}</p>
}

export default function CourseInfoCard({ info, onEdit }) {
  if (!info) return null
  return (
    <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-text-primary">{info.title}</h3>
          <p className="text-xs text-text-muted mt-0.5">{info.subtitle}</p>
        </div>
        {info.actionLabel && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <PencilLine size={13} />
            {info.actionLabel}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        {(info.fields || []).map((field) => (
          <div key={field.id}>
            <p className="text-[11px] font-medium text-text-muted mb-1.5">{field.label}</p>
            <FieldValue field={field} />
          </div>
        ))}
      </div>
    </div>
  )
}
