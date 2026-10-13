import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import dashboardData from './data/dashboardData.json'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Branches from './pages/Branches'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-surface">
        <Sidebar items={dashboardData.sidebar} />
        <main className="ml-56 flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
