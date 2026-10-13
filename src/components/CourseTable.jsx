import { useMemo, useState } from 'react'
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Clock,
  ChevronLeft,
  ChevronRight,
  getIcon,
} from '../utils/icons'

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.5rem center',
}

function FilterSelect({ value, onChange, options, minWidth }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={selectStyle}
      className={`px-4 py-2 text-sm rounded-xl border border-primary-100 bg-surface text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 cursor-pointer appearance-none pr-8 transition-all duration-200 ${minWidth || ''}`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

function CategoryBadge({ category }) {
  const styles = {
    Programming: 'bg-slate-100 text-slate-600',
    Design: 'bg-rose-50 text-rose-500',
    Marketing: 'bg-amber-50 text-amber-600',
    'Data Science': 'bg-blue-50 text-blue-600',
    Business: 'bg-green-50 text-green-600',
  }
  return (
    <span className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-lg ${styles[category] || 'bg-slate-100 text-slate-600'}`}>
      {category}
    </span>
  )
}

function StatusBadge({ status }) {
  const styles = {
    Active: 'bg-green-50 text-success',
    Inactive: 'bg-red-50 text-danger',
    Upcoming: 'bg-amber-50 text-warning',
  }
  const dot = {
    Active: 'bg-success',
    Inactive: 'bg-danger',
    Upcoming: 'bg-warning',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${styles[status] || 'bg-slate-100 text-slate-500'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[status] || 'bg-slate-400'}`} />
      {status}
    </span>
  )
}

function ActionButtons({ onView, onEdit, onDelete }) {
  const stop = (fn) => (e) => {
    e.stopPropagation()
    fn?.(e)
  }
  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={stop(onView)}
        title="View"
        className="w-8 h-8 rounded-lg hover:bg-primary-50 flex items-center justify-center text-text-muted hover:text-primary-500 transition-all duration-200 cursor-pointer"
      >
        <Eye size={15} />
      </button>
      <button
        onClick={stop(onEdit)}
        title="Edit"
        className="w-8 h-8 rounded-lg hover:bg-primary-50 flex items-center justify-center text-text-muted hover:text-primary-500 transition-all duration-200 cursor-pointer"
      >
        <Pencil size={15} />
      </button>
      <button
        onClick={stop(onDelete)}
        title="Delete"
        className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-muted hover:text-danger transition-all duration-200 cursor-pointer"
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}

const formatFee = (fee) => `₹${Number(fee).toLocaleString('en-IN')}`

export default function CourseTable({
  courses = [],
  filters,
  onAdd,
  onView,
  onEdit,
  onDelete,
}) {
  const categories = filters?.categories || ['All Categories']
  const publications = filters?.publications || ['All Publication']
  const statuses = filters?.statuses || ['All Status']
  const sortOptions = filters?.sortOptions || ['Recently Updated']

  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [publication, setPublication] = useState(publications[0])
  const [status, setStatus] = useState(statuses[0])
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filtered = useMemo(() => {
    let result = courses.filter((course) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        course.name.toLowerCase().includes(q) ||
        course.description?.toLowerCase().includes(q)
      const matchesCategory =
        category === 'All Categories' || course.category === category
      const matchesPublication =
        publication === 'All Publication' || course.publication === publication
      const matchesStatus = status === 'All Status' || course.status === status
      return matchesSearch && matchesCategory && matchesPublication && matchesStatus
    })

    switch (sortBy) {
      case 'Name A–Z':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'Name Z–A':
        result = [...result].sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'Fee Low–High':
        result = [...result].sort((a, b) => a.fee - b.fee)
        break
      case 'Fee High–Low':
        result = [...result].sort((a, b) => b.fee - a.fee)
        break
      case 'Duration Short–Long':
        result = [...result].sort((a, b) => a.durationMonths - b.durationMonths)
        break
      case 'Recently Updated':
      default:
        result = [...result].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
        break
    }
    return result
  }, [courses, searchQuery, category, publication, status, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const startIdx = (safePage - 1) * rowsPerPage
  const displayed = filtered.slice(startIdx, startIdx + rowsPerPage)

  const resetPage = (fn) => (value) => {
    setCurrentPage(1)
    fn(value)
  }

  return (
    <div className="space-y-5">
      {/* Filter Bar */}
      <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm px-5 py-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search courses by name..."
            value={searchQuery}
            onChange={(e) => resetPage(setSearchQuery)(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-primary-100 bg-surface focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 text-text-primary placeholder:text-text-muted transition-all duration-200"
          />
        </div>
        <FilterSelect value={category} onChange={resetPage(setCategory)} options={categories} />
        <FilterSelect value={publication} onChange={resetPage(setPublication)} options={publications} />
        <FilterSelect value={status} onChange={resetPage(setStatus)} options={statuses} />
        <FilterSelect value={sortBy} onChange={setSortBy} options={sortOptions} />
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-5 py-2 bg-primary-500 text-white text-sm font-semibold rounded-xl hover:bg-primary-600 shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/35 transition-all duration-200 cursor-pointer whitespace-nowrap"
        >
          <Plus size={16} />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-50 bg-surface">
                <th className="text-left text-[10px] font-bold text-text-muted tracking-widest uppercase px-6 py-3">Course</th>
                <th className="text-left text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Category</th>
                <th className="text-left text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Duration</th>
                <th className="text-left text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Course Fee</th>
                <th className="text-left text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Modules</th>
                <th className="text-center text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Status</th>
                <th className="text-center text-[10px] font-bold text-text-muted tracking-widest uppercase px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((course) => {
                const CourseIcon = getIcon(course.icon)
                return (
                  <tr
                    key={course.id}
                    onClick={() => onView?.(course)}
                    title={`Open ${course.name}`}
                    className="border-b border-primary-50/50 hover:bg-primary-50/30 transition-colors duration-150 group last:border-b-0 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${course.avatarColor || 'bg-primary-100 text-primary-600'} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                          {CourseIcon && <CourseIcon size={16} />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-text-primary truncate group-hover:text-primary-600 transition-colors">{course.name}</p>
                          <p className="text-xs text-text-muted truncate max-w-[240px]">{course.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <CategoryBadge category={course.category} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-text-secondary whitespace-nowrap">
                        <Clock size={13} className="text-text-muted flex-shrink-0" />
                        <span>{course.durationMonths} months</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold text-text-primary whitespace-nowrap">
                        {formatFee(course.fee)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-lg whitespace-nowrap">
                        {course.modules} Modules
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={course.status} />
                    </td>
                    <td className="px-4 py-4">
                      <ActionButtons
                        onView={() => onView?.(course)}
                        onEdit={() => onEdit?.(course)}
                        onDelete={() => onDelete?.(course)}
                      />
                    </td>
                  </tr>
                )
              })}
              {displayed.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-text-muted">
                    No courses found. Try adjusting your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-primary-50">
          <p className="text-xs text-text-muted">
            Showing{' '}
            <span className="font-semibold text-text-primary">
              {filtered.length === 0 ? 0 : startIdx + 1}–{startIdx + displayed.length}
            </span>{' '}
            of <span className="font-semibold text-text-primary">{filtered.length}</span> courses
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="text-xs font-semibold text-text-primary bg-primary-50 border border-primary-100 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="w-8 h-8 rounded-lg border border-primary-100 flex items-center justify-center text-text-muted hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 cursor-pointer disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => {
                const page = i + 1
                const isActive = page === safePage
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                        : 'border border-primary-100 text-text-muted hover:bg-primary-50 hover:text-primary-500'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="w-8 h-8 rounded-lg border border-primary-100 flex items-center justify-center text-text-muted hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 cursor-pointer disabled:opacity-40"
             >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
