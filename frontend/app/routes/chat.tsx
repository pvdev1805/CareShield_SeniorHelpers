import type { Route } from './+types/chat'

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: 'Chat' }, { name: 'description', content: 'Chat with the AI assistant and get insights.' }]
}

const Chat = () => {
  return (
    <>
      <div className='min-h-screen bg-gray-100'>
        <div className='p-4'>
          <h2>Chat</h2>
          <p>Welcome to the chat!</p>
        </div>
      </div>
    </>
  )
}

export default Chat
