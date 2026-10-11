import dashboardData from '../data/dashboardData.json'
import Header from '../components/Header'
import BranchStatCard from '../components/BranchStatCard'
import BranchTable from '../components/BranchTable'

export default function Branches() {
  const { user, branches } = dashboardData

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <Header
        title="Branches"
        subtitle="Manage your institute locations and branch information."
        userName={user.name}
        userRole={user.role}
        showGreeting={false}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {branches.stats.map((stat) => (
          <BranchStatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Branch Table */}
      <BranchTable branches={branches.list} />
    </div>
  )
}
