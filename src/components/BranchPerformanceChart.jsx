import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function BranchPerformanceChart({ data }) {
  return (
    <div className="bg-surface-card rounded-2xl p-6 border border-primary-50 shadow-sm">
      <h3 className="text-base font-bold text-text-primary mb-5">Branches Performance</h3>
      <div className="flex items-center gap-6">
        {/* Donut Chart */}
        <div className="relative w-44 h-44 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.branches}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                dataKey="value"
                strokeWidth={2}
                stroke="#fff"
              >
                {data.branches.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-primary-500">{data.overallPercentage}%</span>
            <span className="text-[10px] text-text-muted font-medium">Performance</span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 gap-2">
          {data.branches.map((branch, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: branch.color }}
              />
              <span className="text-xs text-text-secondary font-medium">{branch.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
