import { useState } from 'react'
import { Search, Download } from '../utils/icons'
import { downloadCSV } from '../utils/csv'

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`

export default function BranchFinanceTable({ data, onViewBranch }) {
  const [searchQuery, setSearchQuery] = useState('')
  if (!data) return null

  const filtered = (data.branches || []).filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleExport = () => {
    const header = ['Branch', 'Students', 'Fees Expected', 'Fees Collected', 'Outstanding', 'Expenses', 'Net Balance']
    const rows = filtered.map((b) => [
      b.name, b.students, b.feesExpected, b.feesCollected, b.outstanding, b.expenses, b.netBalance,
    ])
    downloadCSV('branch-financial-summary.csv', [header, ...rows])
  }

  const money = 'text-sm font-semibold text-text-primary whitespace-nowrap'
  const head = 'text-left text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3'

  return (
    <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm overflow-hidden">
      {/* Header + toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
        <div>
          <h3 className="text-base font-bold text-text-primary">{data.title}</h3>
          <p className="text-xs text-text-muted mt-0.5">{data.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder={data.searchPlaceholder || 'Search branch...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-xl border border-primary-100 bg-surface focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 text-text-primary placeholder:text-text-muted w-56 transition-all duration-200"
            />
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <Download size={14} />
            {data.exportLabel || 'Export CSV'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-b border-primary-50 bg-surface">
              <th className="text-left text-[10px] font-bold text-text-muted tracking-widest uppercase px-6 py-3">Branch</th>
              <th className={head}>Students</th>
              <th className={head}>Fees Expected</th>
              <th className={head}>Fees Collected</th>
              <th className={head}>Outstanding</th>
              <th className={head}>Expenses</th>
              <th className={head}>Net Balance</th>
              <th className="text-center text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr
                key={b.id}
                className="border-b border-primary-50/50 hover:bg-primary-50/30 transition-colors duration-150 group last:border-b-0"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${b.avatarColor} flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                      {b.initial}
                    </div>
                    <span className="text-sm font-semibold text-text-primary">{b.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4"><span className={money}>{b.students.toLocaleString('en-IN')}</span></td>
                <td className="px-4 py-4"><span className={money}>{inr(b.feesExpected)}</span></td>
                <td className="px-4 py-4"><span className={`${money} text-success`}>{inr(b.feesCollected)}</span></td>
                <td className="px-4 py-4"><span className={`${money} text-danger`}>{inr(b.outstanding)}</span></td>
                <td className="px-4 py-4"><span className={money}>{inr(b.expenses)}</span></td>
                <td className="px-4 py-4"><span className="text-sm font-bold text-text-primary whitespace-nowrap">{inr(b.netBalance)}</span></td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => onViewBranch?.(b)}
                    className="text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-sm text-text-muted">
                  No branches found. Try a different search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
