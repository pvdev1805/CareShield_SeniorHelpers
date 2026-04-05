import { Outlet } from 'react-router'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'

const ChatLayout = () => {
  return (
    <>
      <main className='flex min-h-screen'>
        <Sidebar />
        <div className='flex-1'>
          <Header />
          <div className='p-4'>
            <p>Welcome to the chat!</p>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}

export default ChatLayout
