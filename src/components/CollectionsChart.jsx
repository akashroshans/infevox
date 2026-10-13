import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const CollectionsTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-text-primary text-white px-3 py-2 rounded-lg text-xs font-medium shadow-xl space-y-0.5">
        <p className="font-bold">{label}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey}>
            {entry.name}: ₹{Number(entry.value).toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function CollectionsChart({ data }) {
  const [mode, setMode] = useState('Monthly')
  if (!data) return null

  const chartData = mode === 'Monthly' ? data.monthly : data.quarterly

  return (
    <div className="bg-surface-card rounded-2xl p-6 border border-primary-50 shadow-sm h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <h3 className="text-base font-bold text-text-primary">{data.title}</h3>
          <p className="text-xs text-text-muted mt-0.5">{data.subtitle}</p>
        </div>
        <div className="flex items-center gap-1 bg-surface rounded-xl p-1 border border-primary-50 flex-shrink-0">
          {['Monthly', 'Quarterly'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                mode === m
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-text-secondary hover:text-primary-600'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 mb-4 flex-wrap">
        {(data.legend || []).map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[11px] font-medium text-text-secondary">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0" style={{ minHeight: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="feeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="otherGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ecff" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
              tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
              width={48}
            />
            <Tooltip content={<CollectionsTooltip />} />
            <Area
              type="monotone"
              dataKey="feeCollections"
              name="Fee Collections"
              stroke="#7c3aed"
              strokeWidth={2.5}
              fill="url(#feeGradient)"
              dot={false}
              activeDot={{ fill: '#7c3aed', strokeWidth: 2, stroke: '#fff', r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="otherIncome"
              name="Other Income"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#otherGradient)"
              dot={false}
              activeDot={{ fill: '#3b82f6', strokeWidth: 2, stroke: '#fff', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
