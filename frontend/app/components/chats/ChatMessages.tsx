import { useRef, useEffect } from 'react'
import MessageGroup from './MessageGroup'
import type { ChatMessage } from '~/types/chat'

interface ChatMessagesProps {
  messages: ChatMessage[]
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Separate typing messages so they don’t get grouped
  const normalMessages = messages.filter((m) => m.status !== 'typing')
  const typingMessage = messages.find((m) => m.status === 'typing')

  // Group consecutive messages by same sender and no status
  const groups: ChatMessage[][] = []
  let currentGroup: ChatMessage[] = []

  normalMessages.forEach((msg) => {
    if (
      currentGroup.length === 0 ||
      (msg.sender === currentGroup[0].sender &&
        !msg.status &&
        !currentGroup[currentGroup.length - 1].status)
    ) {
      currentGroup.push(msg)
    } else {
      groups.push(currentGroup)
      currentGroup = [msg]
    }
  })

  if (currentGroup.length) groups.push(currentGroup)

  return (
    <div className='flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-100'>
      {groups.map((group) => (
        <MessageGroup key={group[0].id} group={group} />
      ))}

      {/* Typing Indicator when AI is thinking*/}
      {typingMessage && (
        <div className="flex justify-start">
          <div className="bg-gray-200 text-gray-700 rounded-2xl px-4 py-3 max-w-xs">
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}

export default ChatMessages