import { Download } from '../utils/icons'
import { downloadCSV } from '../utils/csv'

const statusStyles = {
  Completed: 'bg-green-50 text-success',
  Pending: 'bg-amber-50 text-warning',
  Failed: 'bg-red-50 text-danger',
}

export default function RecentCollections({ data, onViewAll }) {
  if (!data) return null

  const handleDownload = () => {
    const header = ['Student', 'Student ID', 'Details', 'Amount', 'Status']
    const rows = (data.items || []).map((t) => [t.student, t.studentId, t.meta, t.amount, t.status])
    downloadCSV('fee-transactions.csv', [header, ...rows])
  }

  return (
    <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-text-primary">{data.title}</h3>
          <p className="text-xs text-text-muted mt-0.5">{data.subtitle}</p>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors cursor-pointer whitespace-nowrap"
        >
          {data.viewAllLabel}
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {(data.items || []).map((txn) => (
          <div key={txn.id} className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${txn.avatarColor} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
              {txn.initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text-primary truncate">
                {txn.student} <span className="font-normal text-text-muted">({txn.studentId})</span>
              </p>
              <p className="text-[11px] text-text-muted truncate">{txn.meta}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-text-primary whitespace-nowrap">
                ₹{Number(txn.amount).toLocaleString('en-IN')}
              </p>
              <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5 ${statusStyles[txn.status] || 'bg-slate-100 text-slate-500'}`}>
                {txn.status}
              </span>
            </div>
          </div>
        ))}
        {(data.items || []).length === 0 && (
          <p className="text-sm text-text-muted text-center py-8">
            No collections match the selected filters.
          </p>
        )}
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100 transition-all duration-200 cursor-pointer"
      >
        <Download size={14} />
        {data.downloadLabel}
      </button>
    </div>
  )
}
