import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
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

/* Custom label rendered as a small badge on the reference line */
const ReferenceLabel = (props) => {
  const { viewBox } = props
  const x = viewBox.x || 0
  const y = viewBox.y || 0
  return (
    <g>
      <rect x={x - 4} y={y - 12} width={38} height={22} rx={6} fill="#e9e3ff" />
      <text x={x + 15} y={y + 3} textAnchor="middle" fill="#5b21b6" fontSize={9} fontWeight={700}>
        ₹15k
      </text>
    </g>
  )
}

export default function ExpensesChart({ data }) {
  /* Find max month to place the reference dot */
  const maxEntry = data.monthly.reduce(
    (max, entry) => (entry.amount > max.amount ? entry : max),
    data.monthly[0],
  )

  return (
    <div className="bg-surface-card rounded-2xl p-6 border border-primary-50 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-base font-bold text-text-primary">Expenses</h3>
        <p className="text-sm text-text-secondary mt-0.5">
          <span className="text-xl font-bold text-text-primary">₹{(data.totalSpent / 1000).toFixed(0)}k</span>{' '}
          <span className="text-text-muted text-xs">Total spent</span>
        </p>
      </div>
      <div className="flex-1 min-h-0" style={{ minHeight: '180px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.monthly} barSize={30} barGap={6} margin={{ top: 20, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c4b5fd" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.45} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
              dy={8}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124, 58, 237, 0.04)' }} />
            <ReferenceLine
              y={15000}
              stroke="#9ca3af"
              strokeDasharray="6 4"
              strokeWidth={1.5}
              label={<ReferenceLabel />}
            />
            <ReferenceDot
              x={maxEntry.month}
              y={15000}
              r={5}
              fill="#1e1b4b"
              stroke="#fff"
              strokeWidth={2}
            />
            <Bar
              dataKey="amount"
              radius={[8, 8, 0, 0]}
              fill="url(#barGradient)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
