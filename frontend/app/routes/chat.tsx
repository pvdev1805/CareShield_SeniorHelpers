import { useState } from 'react'
import type { Route } from './+types/chat'
import ChatHeader from '~/components/chats/ChatHeader'
import ChatMessages from '~/components/chats/ChatMessages'
import ChatInput from '~/components/chats/ChatInput'

type ChatMessage = {
  id: number
  sender: 'user' | 'ai'
  text: string
}

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: 'Chat' }, { name: 'description', content: 'Chat with the AI assistant and get insights.' }]
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: 'ai', text: 'Hello! How can I help you today?' },
    { id: 2, sender: 'user', text: 'I want to report the incident.' }
  ])

  const handleSend = (text: string) => {
    setMessages((msgs) => [...msgs, { id: msgs.length + 1, sender: 'user', text }])
  }

  return (
    <div className='flex flex-col h-[calc(100vh-56px)] bg-gray-100'>
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  )
}

export default Chat
