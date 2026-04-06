import userAvatar from '~/assets/images/avatar.png'
import aiAvatar from '~/assets/images/avatar-ai.svg'

type Message = {
  id: string
  sender: 'user' | 'ai'
  text?: string
  status?: 'recording' | 'uploading' | 'waiting' | 'error'
}

interface ChatMessagesProps {
  messages: Message[]
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className='flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-50'>
      {messages.map((msg, idx) => {
        const isUser = msg.sender === 'user'
        const showAvatar = idx === 0 || messages[idx - 1].sender !== msg.sender || messages[idx - 1].status

        // Display different UI based on message status (recording, uploading, waiting, error)
        if (msg.status === 'recording') {
          return (
            <div key={msg.id} className='flex justify-end items-end'>
              <div className='flex items-center bg-black text-white px-4 py-2 rounded-lg'>
                <span className='mr-2 animate-pulse text-red-500'>●</span>
                Recording...
              </div>
              <img src={userAvatar} alt='User' className='w-8 h-8 rounded-full ml-2 shadow border object-cover' />
            </div>
          )
        }
        if (msg.status === 'uploading') {
          return (
            <div key={msg.id} className='flex justify-end items-end'>
              <div className='flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg'>
                <span className='mr-2 animate-spin'>⏳</span>
                Uploading audio...
              </div>
              <img src={userAvatar} alt='User' className='w-8 h-8 rounded-full ml-2 shadow border object-cover' />
            </div>
          )
        }
        if (msg.status === 'waiting') {
          return (
            <div key={msg.id} className='flex justify-end items-end'>
              <div className='flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg'>
                <span className='mr-2 animate-pulse'>...</span>
                Waiting for AI response...
              </div>
              <img src={userAvatar} alt='User' className='w-8 h-8 rounded-full ml-2 shadow border object-cover' />
            </div>
          )
        }
        if (msg.status === 'error') {
          return (
            <div key={msg.id} className='flex justify-end items-end'>
              <div className='flex items-center bg-red-600 text-white px-4 py-2 rounded-lg'>Error processing audio</div>
              <img src={userAvatar} alt='User' className='w-8 h-8 rounded-full ml-2 shadow border object-cover' />
            </div>
          )
        }

        // Display normal message
        return (
          <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end`}>
            {showAvatar && !isUser && (
              <img src={aiAvatar} alt='AI' className='w-8 h-8 rounded-full mr-2 shadow border object-cover' />
            )}
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 text-sm shadow 
                ${isUser ? 'bg-purple-600 text-white ml-auto' : 'bg-white border text-gray-900 mr-auto'}`}
              style={{
                marginLeft: !showAvatar && !isUser ? '3rem' : undefined,
                marginRight: !showAvatar && isUser ? '3rem' : undefined
              }}
            >
              {msg.text}
            </div>
            {showAvatar && isUser && (
              <img src={userAvatar} alt='User' className='w-8 h-8 rounded-full ml-2 shadow border object-cover' />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ChatMessages
