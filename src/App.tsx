import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Sales from './pages/Sales'
import Customers from './pages/Customers'
import CoreWebVitals from './pages/CoreWebVitals'
import ScrumOfScrum from './pages/ScrumOfScrum'
import Funnel from './pages/Funnel'
import DashboardLayout from './components/layout/DashboardLayout'

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/core-web-vitals" element={<CoreWebVitals />} />
          <Route path="/scrum-of-scrum" element={<ScrumOfScrum />} />
          <Route path="/funnel" element={<Funnel />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </DashboardLayout>
    </Router>
  )
}

export default App

