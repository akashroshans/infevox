import { getIcon, TrendingUp } from '../utils/icons'

export default function StatCard({ stat }) {
  const Icon = getIcon(stat.icon)

  const cardStyles = {
    students: {
      color: 'bg-violet-200',
      icon: 'bg-violet-200 text-violet-600',
      circle: 'bg-violet-200',
    },
    branches: {
      color: 'bg-sky-200',
      icon: 'bg-sky-200 text-sky-600',
      circle: 'bg-sky-200',
    },
    courses: {
      color: 'bg-red-200',
      icon: 'bg-red-200 text-red-600',
      circle: 'bg-red-200',
    },
    staffs: {
      color: 'bg-emerald-200',
      icon: 'bg-emerald-200 text-emerald-600',
      circle: 'bg-emerald-200',
    },
  }

  const key = stat.label.toLowerCase().includes('student')
    ? 'students'
    : stat.label.toLowerCase().includes('branch')
      ? 'branches'
      : stat.label.toLowerCase().includes('course')
        ? 'courses'
        : 'staffs'

  const style = cardStyles[key]

  return (
    <div className="relative isolate overflow-hidden rounded-[22px] border border-slate-100 bg-white px-5 py-5 shadow-sm transition-all duration-300 hover:shadow-md">

      {/* Decorative background circles */}
      <div
        className={`absolute -right-5 -top-10 -z-10 h-40 w-40 rounded-full ${style.circle}`}
        style={{ opacity: 0.65 }}
      />

      <div
        className={`absolute -bottom-12 -left-8 -z-10 h-20 w-20 rounded-full ${style.circle}`}
        style={{ opacity: 0.55 }}
      />

      {/* Icon and percentage */}
      <div className="mb-2 flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.icon}`}
        >
          {Icon && <Icon size={22} />}
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-700">
          <TrendingUp size={12} />
          <span>{stat.change}</span>
        </div>
      </div>

      {/* Statistics */}
      <p className="mb-0.5 text-xs font-medium text-slate-600">
        {stat.label}
      </p>

      <p className="mb-2 text-3xl font-extrabold leading-none tracking-tight text-slate-900">
        {stat.value.toLocaleString()}
      </p>

      {/* Active and inactive counts */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-700">
            {stat.active.toLocaleString()}
          </span>
          <span className="text-slate-600">Active</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          <span className="font-semibold text-slate-700">
            {stat.inactive.toLocaleString()}
          </span>
          <span className="text-slate-600">Inactive</span>
        </div>
      </div>
    </div>
  )
}
