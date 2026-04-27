interface MessageBubbleProps {
  text: string
  sender: 'user' | 'ai'
}

const MessageBubble = ({ text, sender }: MessageBubbleProps) => {
  const isUser = sender === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end`}>
      <div
        className={`rounded-lg px-4 py-2 text-sm shadow 
          ${isUser ? 'bg-purple-600 text-white ml-auto' : 'bg-white border text-gray-900 mr-auto'}`}
        style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
      >
        {text}
      </div>
    </div>
  )
}

export default MessageBubble
