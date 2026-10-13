import { useState } from 'react'
import dashboardData from './data/dashboardData.json'
import courseDetailData from './data/courseDetailData.json'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Branches from './pages/Branches'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const handleOpenDetail = (course) => {
    setSelectedCourse(course)
    setActivePage('course-detail')
  }

  const handleBackToCourses = () => {
    setSelectedCourse(null)
    setActivePage('courses')
  }

  const handleNavigate = (page) => {
    setSelectedCourse(null)
    setActivePage(page)
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />
      case 'branches':
        return <Branches />
      case 'courses':
        return <Courses onOpenDetail={handleOpenDetail} />
      case 'course-detail':
        return (
          <CourseDetail
            key={selectedCourse?.id || 'detail'}
            course={selectedCourse}
            template={courseDetailData}
            user={dashboardData.user}
            onBack={handleBackToCourses}
            onEdit={() => {}}
          />
        )
      default:
        return <Dashboard />
    }
  }

  // Keep sidebar highlight on Courses while viewing a course detail
  const sidebarActive = activePage === 'course-detail' ? 'courses' : activePage

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar
        items={dashboardData.sidebar}
        activePage={sidebarActive}
        onNavigate={handleNavigate}
      />
      <main className="ml-56 flex-1 flex flex-col">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
