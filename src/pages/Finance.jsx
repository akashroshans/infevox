import { useState } from 'react'
import dashboardData from '../data/dashboardData.json'
import financeData from '../data/financeData.json'
import Header from '../components/Header'
import FinanceTabs from '../components/FinanceTabs'
import FinanceStatCard from '../components/FinanceStatCard'
import CollectionsChart from '../components/CollectionsChart'
import ExpenseBreakdown from '../components/ExpenseBreakdown'
import BranchFinanceTable from '../components/BranchFinanceTable'
import RecentCollections from '../components/RecentCollections'
import OutstandingSnapshot from '../components/OutstandingSnapshot'
import { Download, Plus } from '../utils/icons'

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.5rem center',
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={selectStyle}
      className="px-4 py-2 text-sm rounded-xl border border-primary-100 bg-surface text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 cursor-pointer appearance-none pr-8 transition-all duration-200"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

export default function Finance() {
  const { user } = dashboardData
  const [activeTab, setActiveTab] = useState(financeData.tabs[0])
  const [academicYear, setAcademicYear] = useState(financeData.filters.academicYears[0])
  const [branch, setBranch] = useState(financeData.filters.branches[0])
  const [period, setPeriod] = useState(financeData.filters.periods[0])

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <Header
        title="Finance"
        subtitle="Manage institute finances, branch-wise collections, outstanding fees and expenses."
        userName={user.name}
        userRole={user.role}
        showGreeting={false}
      />

      {/* Tabs */}
      <FinanceTabs tabs={financeData.tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'Overview' && (
        <>
          {/* Filter bar */}
          <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm px-5 py-4 flex flex-wrap items-center gap-3 mb-6">
            <FilterSelect value={academicYear} onChange={setAcademicYear} options={financeData.filters.academicYears} />
            <FilterSelect value={branch} onChange={setBranch} options={financeData.filters.branches} />
            <FilterSelect value={period} onChange={setPeriod} options={financeData.filters.periods} />
            <div className="flex-1" />
            <button className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100 transition-all duration-200 cursor-pointer whitespace-nowrap">
              <Download size={15} />
              <span>Export Report</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-primary-500 text-white text-sm font-semibold rounded-xl hover:bg-primary-600 shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/35 transition-all duration-200 cursor-pointer whitespace-nowrap">
              <Plus size={16} />
              <span>Record Payment</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-5 mb-6">
            {financeData.stats.map((stat) => (
              <FinanceStatCard key={stat.id} stat={stat} />
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-12 gap-5 mb-6">
            <div className="col-span-7">
              <CollectionsChart data={financeData.collectionsOverview} />
            </div>
            <div className="col-span-5">
              <ExpenseBreakdown data={financeData.expenseBreakdown} />
            </div>
          </div>

          {/* Branch summary */}
          <div className="mb-6">
            <BranchFinanceTable data={financeData.branchSummary} />
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-7">
              <RecentCollections data={financeData.recentCollections} />
            </div>
            <div className="col-span-5">
              <OutstandingSnapshot data={financeData.outstandingSnapshot} />
            </div>
          </div>
        </>
      )}

      {activeTab !== 'Overview' && (
        <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm p-12 text-center">
          <p className="text-base font-bold text-text-primary">{activeTab}</p>
          <p className="text-sm text-text-muted mt-1">
            Detailed {activeTab.toLowerCase()} breakdown will appear here.
          </p>
        </div>
      )}
    </div>
  )
}
