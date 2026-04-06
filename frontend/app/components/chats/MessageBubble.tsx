import userAvatar from '~/assets/images/avatar.png'
import aiAvatar from '~/assets/images/avatar-ai.svg'

interface MessageBubbleProps {
  text: string
  sender: 'user' | 'ai'
  showAvatar: boolean
}

const MessageBubble = ({ text, sender, showAvatar }: MessageBubbleProps) => {
  const isUser = sender === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end`}>
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
        {text}
      </div>
      {showAvatar && isUser && (
        <img src={userAvatar} alt='User' className='w-8 h-8 rounded-full ml-2 shadow border object-cover' />
      )}
    </div>
  )
}

export default MessageBubble
