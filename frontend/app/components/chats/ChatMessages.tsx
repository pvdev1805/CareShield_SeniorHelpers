import { useRef, useEffect } from 'react'
import userAvatar from '~/assets/images/avatar.png'
import aiAvatar from '~/assets/images/avatar-ai.svg'

type Message = {
  id: number
  sender: 'user' | 'ai'
  text: string
}

interface ChatMessagesProps {
  messages: Message[]
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <div className='flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-100'>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user'
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end`}>
              {!isUser && (
                <img src={aiAvatar} alt='AI' className='w-8 h-8 rounded-full mr-2 shadow border object-cover' />
              )}
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 text-sm shadow 
                  ${isUser ? 'bg-purple-600 text-white ml-auto' : 'bg-white border text-gray-900 mr-auto'}`}
              >
                {msg.text}
              </div>
              {isUser && (
                <img src={userAvatar} alt='User' className='w-8 h-8 rounded-full ml-2 shadow border object-cover' />
              )}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>
    </>
  )
}

export default ChatMessages
