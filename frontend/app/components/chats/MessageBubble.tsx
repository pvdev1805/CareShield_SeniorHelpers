import userAvatar from '~/assets/images/avatar.png'
import aiAvatar from '~/assets/images/avatar-ai.svg'
import Avatar from './Avatar'

interface MessageBubbleProps {
  text: string
  sender: 'user' | 'ai'
  showAvatar: boolean
}

const MessageBubble = ({ text, sender, showAvatar }: MessageBubbleProps) => {
  const isUser = sender === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end`}>
      {showAvatar && !isUser && <Avatar src={aiAvatar} alt='AI' className='mr-2' />}
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
      {showAvatar && isUser && <Avatar src={userAvatar} alt='User' className='ml-2' />}
    </div>
  )
}

export default MessageBubble
