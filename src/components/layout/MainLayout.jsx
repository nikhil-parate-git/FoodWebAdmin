import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar fixed rahega */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        {/* Yahan fix hai: 
          1. 'overflow-y-auto' scroll allow karega.
          2. 'scrollbar-hide' us dande (scrollbar) ko gayab karega.
        */}
        <main className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <div className="animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout