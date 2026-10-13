import { ArrowLeft, PencilLine } from '../utils/icons'

export default function CourseDetailHeader({ breadcrumb = [], title, status, publication, subtitle, onBack, onEdit }) {
  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <p className="text-xs text-text-muted mb-2">
          {breadcrumb.map((crumb, i) => (
            <span key={i}>
              <span className={i === breadcrumb.length - 1 ? 'text-primary-500 font-medium' : ''}>
                {crumb}
              </span>
              {i < breadcrumb.length - 1 && <span className="mx-1.5">/</span>}
            </span>
          ))}
        </p>
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
            {status && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-success bg-green-50 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                {status}
              </span>
            )}
            {publication && (
              <span className="text-[11px] font-semibold text-primary-500 bg-primary-50 px-2.5 py-0.5 rounded-full">
                {publication}
              </span>
            )}
          </div>
          {subtitle && <p className="text-sm text-text-muted mt-1.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-text-secondary bg-surface-card border border-primary-100 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <ArrowLeft size={14} />
            Back to Courses
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-primary-600 bg-primary-50 border border-primary-100 rounded-xl hover:bg-primary-100 transition-all duration-200 cursor-pointer"
          >
            <PencilLine size={14} />
            Edit Course
          </button>
        </div>
      </div>
    </div>
  )
}
