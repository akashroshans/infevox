import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function ExpenseBreakdown({ data, onDetails }) {
  if (!data) return null

  const usedPct = data.monthlyCap
    ? Math.min(100, Math.round((data.total / data.monthlyCap) * 100))
    : 0

  return (
    <div className="bg-surface-card rounded-2xl p-6 border border-primary-50 shadow-sm h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-text-primary">{data.title}</h3>
          <p className="text-xs text-text-muted mt-0.5">{data.subtitle}</p>
        </div>
        {data.actionLabel && (
          <button
            onClick={onDetails}
            className="text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors cursor-pointer"
          >
            {data.actionLabel}
          </button>
        )}
      </div>

      <div className="flex items-center gap-5">
        {/* Donut */}
        <div className="relative w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.categories}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={68}
                dataKey="amount"
                strokeWidth={2}
                stroke="#fff"
              >
                {data.categories.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-extrabold text-text-primary">{data.totalLabel}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2 min-w-0">
          {data.categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2 text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-text-secondary font-medium truncate flex-1">{cat.name}</span>
              <span className="font-bold text-text-primary whitespace-nowrap">
                ₹{cat.amount.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cap footer */}
      <div className="mt-5 pt-4 border-t border-primary-50">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-text-muted font-medium">
            Monthly Expense Cap: <span className="font-bold text-text-primary">{data.monthlyCapLabel}</span>
          </span>
          <span className="font-bold text-primary-500">{usedPct}% Utilised</span>
        </div>
        <div className="h-1.5 rounded-full bg-primary-50 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-500"
            style={{ width: `${usedPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
