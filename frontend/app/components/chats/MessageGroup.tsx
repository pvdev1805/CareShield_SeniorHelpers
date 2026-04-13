import MessageBubble from './MessageBubble'
import StatusBubble from './StatusBubble'
import Avatar from './Avatar'
import userAvatar from '~/assets/images/avatar.png'
import aiAvatar from '~/assets/images/avatar-ai.svg'

import type { Message } from '~/types/chat'

interface MessageGroupProps {
  group: Message[]
}

const MessageGroup = ({ group }: MessageGroupProps) => {
  const isUser = group[0].sender === 'user'
  const avatarSrc = isUser ? userAvatar : aiAvatar
  const avatarAlt = isUser ? 'User' : 'AI'

  return (
    <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
      {group.map((msg, idx) => {
        const isFirst = idx === 0
        return (
          <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end`}>
            {/* Display avatar for the first message in the group */}
            {isFirst && !isUser && <Avatar src={avatarSrc} alt={avatarAlt} className='mr-2' />}
            <div className={isFirst ? '' : isUser ? 'mr-10' : 'ml-10'}>
              {msg.status ? (
                <StatusBubble status={msg.status} />
              ) : (
                <MessageBubble text={msg.text || ''} sender={msg.sender} />
              )}
            </div>
            {isFirst && isUser && <Avatar src={avatarSrc} alt={avatarAlt} className='ml-2' />}
          </div>
        )
      })}
    </div>
  )
}

export default MessageGroup
