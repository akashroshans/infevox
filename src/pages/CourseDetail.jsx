import { useMemo, useState } from 'react'
import { ChevronLeft, RefreshCw, User } from '../utils/icons'
import { buildCourseDetail } from '../utils/buildCourseDetail'
import CourseDetailHeader from '../components/CourseDetailHeader'
import CourseDetailStats from '../components/CourseDetailStats'
import CourseDetailTabs from '../components/CourseDetailTabs'
import CourseInfoCard from '../components/CourseInfoCard'
import CurriculumBreakdown from '../components/CurriculumBreakdown'
import CourseActivityCard from '../components/CourseActivityCard'

export default function CourseDetail({ course, template, user, onBack, onEdit }) {
  const [activeTab, setActiveTab] = useState('overview')

  // Dynamic: every field on this page derives from the clicked course row
  const detail = useMemo(() => buildCourseDetail(course, template), [course, template])

  if (!detail) return null

  // Student / staff tab numbers come from the same dynamic detail object
  const enrolledCount = detail.tabs?.find((t) => t.id === 'students')?.count
  const staffCount = detail.tabs?.find((t) => t.id === 'staff')?.count

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Top utility bar (matches app Header right side) */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-surface-card border border-primary-100 flex items-center justify-center text-text-secondary hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 shadow-sm cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-4">
          <span className="px-4 py-1.5 bg-primary-500 text-white text-xs font-semibold rounded-full shadow-md shadow-primary-500/25">
            {user?.role || 'Super Admin'}
          </span>
          <button className="w-9 h-9 rounded-full bg-surface-card border border-primary-100 flex items-center justify-center text-text-secondary hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 shadow-sm cursor-pointer">
            <RefreshCw size={17} />
          </button>
          <button className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 hover:bg-primary-200 transition-all duration-200 cursor-pointer">
            <User size={18} />
          </button>
        </div>
      </div>

      {/* Title + breadcrumb + actions */}
      <CourseDetailHeader
        breadcrumb={detail.breadcrumb}
        title={detail.title}
        status={detail.status}
        publication={detail.publication}
        subtitle={detail.subtitle}
        onBack={onBack}
        onEdit={onEdit}
      />

      {/* Stats */}
      <CourseDetailStats stats={detail.stats} />

      {/* Tabs */}
      <CourseDetailTabs tabs={detail.tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8 space-y-5">
            <CourseInfoCard info={detail.information} onEdit={onEdit} />
            <CurriculumBreakdown curriculum={detail.curriculum} />
          </div>
          <div className="col-span-4">
            <CourseActivityCard activity={detail.activity} />
          </div>
        </div>
      )}

      {activeTab === 'modules' && (
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8">
            <CurriculumBreakdown curriculum={detail.curriculum} />
          </div>
          <div className="col-span-4">
            <CourseActivityCard activity={detail.activity} />
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm p-8 text-center">
          <p className="text-sm font-semibold text-text-primary">
            {enrolledCount} Students Enrolled
          </p>
          <p className="text-xs text-text-muted mt-1">
            Student roster for {detail.title} will appear here.
          </p>
        </div>
      )}

      {activeTab === 'staff' && (
        <div className="bg-surface-card rounded-2xl border border-primary-50 shadow-sm p-8 text-center">
          <p className="text-sm font-semibold text-text-primary">
            {staffCount} Staff Assigned
          </p>
          <p className="text-xs text-text-muted mt-1">
            Assigned instructors and TAs for {detail.title} will appear here.
          </p>
        </div>
      )}
    </div>
  )
}
