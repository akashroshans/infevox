import dashboardData from '../data/dashboardData.json'
import coursesData from '../data/coursesData.json'
import Header from '../components/Header'
import CourseStatCard from '../components/CourseStatCard'
import CourseTable from '../components/CourseTable'

export default function Courses({ onOpenDetail, onAdd }) {
  const { user } = dashboardData
  const { stats, filters, courses } = coursesData

  // Clicking a particular course row opens its dynamic detail page
  const handleOpen = (course) => {
    if (!course) return
    onOpenDetail?.(course)
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <Header
        title="Courses"
        subtitle="View and manage courses, modules, students and assigned staff across your institute."
        userName={user.name}
        userRole={user.role}
        showGreeting={false}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {stats.map((stat) => (
          <CourseStatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Filter + Table (reusable, data-driven from coursesData.json) */}
      {/* Row click / view / edit opens that course's dynamic detail. Add is separate. */}
      <CourseTable
        courses={courses}
        filters={filters}
        onAdd={onAdd}
        onView={(course) => handleOpen(course)}
        onEdit={(course) => handleOpen(course)}
        onDelete={() => {}}
      />
    </div>
  )
}
