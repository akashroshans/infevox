import dashboardData from '../data/dashboardData.json'
import Header from '../components/Header'
import StatCard from '../components/StatCard'
import BranchPerformanceChart from '../components/BranchPerformanceChart'
import ExpensesChart from '../components/ExpensesChart'
import OverallIncomeChart from '../components/OverallIncomeChart'
import RecentActivity from '../components/RecentActivity'

export default function Dashboard() {
  const { user, stats, branchPerformance, expenses, overallIncome, recentActivity } = dashboardData

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <Header userName={user.name} userRole={user.role} />

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Charts Row: Branch Performance + Expenses + Recent Activity */}
      <div className="grid grid-cols-12 gap-5 mb-6">
        {/* Branch Performance - 4 cols */}
        <div className="col-span-4">
          <BranchPerformanceChart data={branchPerformance} />
        </div>

        {/* Expenses - 4 cols */}
        <div className="col-span-4">
          <ExpensesChart data={expenses} />
        </div>

        {/* Recent Activity - 4 cols, spans 2 rows */}
        <div className="col-span-4 row-span-2">
          <RecentActivity activities={recentActivity} />
        </div>

        {/* Overall Income - spans below Branch Performance + Expenses */}
        <div className="col-span-8">
          <OverallIncomeChart data={overallIncome} />
        </div>
      </div>
    </div>
  )
}
