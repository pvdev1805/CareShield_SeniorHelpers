import { useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import userAvatar from '~/assets/images/avatar.png'

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
  const bottomRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-50'>
      {messages.map((msg, idx) => {
        const showAvatar =
          idx === 0 || messages[idx - 1].sender !== msg.sender || messages[idx - 1].status !== undefined

        // Handle special statuses for user messages (recording, uploading, waiting, error)
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

        // Display normal messages
        return <MessageBubble key={msg.id} text={msg.text || ''} sender={msg.sender} showAvatar={showAvatar} />
      })}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatMessages
