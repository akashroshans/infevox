import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
  Label,
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

export default function ExpensesChart({ data }) {
  return (
    <div className="bg-surface-card rounded-2xl p-6 border border-primary-50 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-bold text-text-primary">Expenses</h3>
        <p className="text-sm text-text-secondary mt-0.5">
          <span className="text-xl font-bold text-text-primary">₹{(data.totalSpent / 1000).toFixed(0)}k</span>{' '}
          <span className="text-text-muted text-xs">Total spent</span>
        </p>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.monthly} barSize={28} barGap={4}>
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
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124, 58, 237, 0.04)' }} />
            <ReferenceLine
              y={15000}
              stroke="#9ca3af"
              strokeDasharray="6 4"
              strokeWidth={1.5}
            >
              <Label
                value="₹15k"
                position="left"
                fill="#6b7280"
                fontSize={10}
                fontWeight={600}
                offset={8}
                className="bg-primary-100 px-1 rounded"
              />
            </ReferenceLine>
            <Bar
              dataKey="amount"
              radius={[6, 6, 0, 0]}
              fill="url(#barGradient)"
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
