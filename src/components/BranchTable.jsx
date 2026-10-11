import { useState } from 'react'
import { Search, Plus, Eye, Pencil, Trash2, MapPin, ChevronLeft, ChevronRight } from '../utils/icons'

function StatusBadge({ status }) {
  const isActive = status === 'Active'
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full
      ${isActive ? 'bg-green-50 text-success' : 'bg-red-50 text-danger'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-success' : 'bg-danger'}`} />
      {status}
    </span>
  )
}

function ActionButtons() {
  return (
    <div className="flex items-center gap-1">
      <button className="w-8 h-8 rounded-lg hover:bg-primary-50 flex items-center justify-center text-text-muted hover:text-primary-500 transition-all duration-200 cursor-pointer">
        <Eye size={15} />
      </button>
      <button className="w-8 h-8 rounded-lg hover:bg-primary-50 flex items-center justify-center text-text-muted hover:text-primary-500 transition-all duration-200 cursor-pointer">
        <Pencil size={15} />
      </button>
      <button className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-muted hover:text-danger transition-all duration-200 cursor-pointer">
        <Trash2 size={15} />
      </button>
    </div>
  )
}

export default function BranchTable({ branches }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [rowsPerPage] = useState(10)
  const [currentPage] = useState(1)

  const filtered = branches.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'All Status' || branch.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filtered.length / rowsPerPage)
  const displayed = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  return (
    <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-text-primary">All Branches</h3>
          <span className="text-xs font-semibold text-primary-500 bg-primary-50 px-2.5 py-0.5 rounded-full">
            {filtered.length} branches
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search branch name or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-xl border border-primary-100 bg-surface focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 text-text-primary placeholder:text-text-muted w-64 transition-all duration-200"
            />
          </div>
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 text-sm rounded-xl border border-primary-100 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 cursor-pointer appearance-none pr-8 transition-all duration-200"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
            }}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          {/* Add Branch */}
          <button className="flex items-center gap-2 px-5 py-2 bg-primary-500 text-white text-sm font-semibold rounded-xl hover:bg-primary-600 shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/35 transition-all duration-200 cursor-pointer">
            <Plus size={16} />
            <span>Add Branch</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-b border-primary-50 bg-surface">
              <th className="text-left text-[10px] font-bold text-text-muted tracking-widest uppercase px-6 py-3">Branch</th>
              <th className="text-left text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Branch Code</th>
              <th className="text-left text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Location</th>
              <th className="text-center text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Students</th>
              <th className="text-center text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Staff</th>
              <th className="text-center text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Status</th>
              <th className="text-center text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((branch) => (
              <tr
                key={branch.id}
                className="border-b border-primary-50/50 hover:bg-primary-50/30 transition-colors duration-150 group"
              >
                {/* Branch Name + Avatar */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${branch.avatarColor} flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                      {branch.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{branch.name}</p>
                      <p className="text-xs text-text-muted">{branch.type}</p>
                    </div>
                  </div>
                </td>
                {/* Code */}
                <td className="px-4 py-4">
                  <span className="text-xs font-mono font-semibold text-primary-500 bg-primary-50 px-2.5 py-1 rounded-lg">
                    {branch.code}
                  </span>
                </td>
                {/* Location */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                    <MapPin size={13} className="text-text-muted flex-shrink-0" />
                    <span>{branch.location}</span>
                  </div>
                </td>
                {/* Students */}
                <td className="px-4 py-4 text-center">
                  <span className="text-sm font-semibold text-text-primary">
                    {branch.students.toLocaleString()}
                  </span>
                </td>
                {/* Staff */}
                <td className="px-4 py-4 text-center">
                  <span className="text-sm font-semibold text-text-primary">{branch.staff}</span>
                </td>
                {/* Status */}
                <td className="px-4 py-4 text-center">
                  <StatusBadge status={branch.status} />
                </td>
                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex justify-center">
                    <ActionButtons />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-primary-50">
        <p className="text-xs text-text-muted">
          Showing <span className="font-semibold text-text-primary">1–{displayed.length}</span> of{' '}
          <span className="font-semibold text-text-primary">{filtered.length}</span> branches
        </p>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted">Rows per page:</span>
          <select className="text-xs font-semibold text-text-primary bg-transparent border-none focus:outline-none cursor-pointer">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <div className="flex items-center gap-1 ml-2">
            <button className="w-8 h-8 rounded-lg border border-primary-100 flex items-center justify-center text-text-muted hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 cursor-pointer disabled:opacity-40" disabled={currentPage === 1}>
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-primary-500/25">
              {currentPage}
            </button>
            <button className="w-8 h-8 rounded-lg border border-primary-100 flex items-center justify-center text-text-muted hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 cursor-pointer disabled:opacity-40" disabled={currentPage >= totalPages}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
