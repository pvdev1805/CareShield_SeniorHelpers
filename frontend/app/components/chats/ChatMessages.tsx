import { useRef, useEffect } from 'react'
import MessageGroup from './MessageGroup'
import type { Message } from '~/types/chat'

interface ChatMessagesProps {
  messages: Message[]
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Group consecutive messages by same sender and no status
  const groups: Message[][] = []
  let currentGroup: Message[] = []
  messages.forEach((msg) => {
    if (
      currentGroup.length === 0 ||
      (msg.sender === currentGroup[0].sender && !msg.status && !currentGroup[currentGroup.length - 1].status)
    ) {
      currentGroup.push(msg)
    } else {
      groups.push(currentGroup)
      currentGroup = [msg]
    }
  })
  if (currentGroup.length) groups.push(currentGroup)

  return (
    <div className='flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-50'>
      {groups.map((group) => (
        <MessageGroup key={group[0].id} group={group} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatMessages
