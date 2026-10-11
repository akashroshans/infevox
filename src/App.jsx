import { useState } from 'react'
import dashboardData from './data/dashboardData.json'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Branches from './pages/Branches'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />
      case 'branches':
        return <Branches />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar
        items={dashboardData.sidebar}
        activePage={activePage}
        onNavigate={setActivePage}
      />
      <main className="ml-56 flex-1 flex flex-col">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
