import { Outlet } from 'react-router'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'

const Layout = () => {
  return (
    <main className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        {/* Scrollable page area */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default Layout