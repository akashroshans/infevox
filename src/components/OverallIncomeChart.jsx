import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-text-primary text-white px-3 py-2 rounded-lg text-xs font-medium shadow-xl">
        <p>{label}: ₹{payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export default function OverallIncomeChart({ data }) {
  return (
    <div className="bg-surface-card rounded-2xl p-6 border border-primary-50 shadow-sm h-full flex flex-col">
      <h3 className="text-base font-bold text-text-primary mb-5">Overall Income</h3>
      <div className="flex-1 min-h-0" style={{ minHeight: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0.02} />
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
              tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#a855f7"
              strokeWidth={2.5}
              fill="url(#incomeGradient)"
              dot={{ fill: '#a855f7', strokeWidth: 2, stroke: '#fff', r: 4 }}
              activeDot={{ fill: '#7c3aed', strokeWidth: 2, stroke: '#fff', r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
