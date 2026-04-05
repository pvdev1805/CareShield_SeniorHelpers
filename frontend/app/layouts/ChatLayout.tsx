import { Outlet } from 'react-router'
import Sidebar from '~/components/Sidebar'

const ChatLayout = () => {
  return (
    <>
      <main className='flex min-h-screen'>
        <Sidebar />
        <div className='flex-1'>
          <header>
            <h1>Chat</h1>
          </header>
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
