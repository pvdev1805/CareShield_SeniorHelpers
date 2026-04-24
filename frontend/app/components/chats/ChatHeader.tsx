import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router'

interface ChatHeaderProps {
  title?: string
  showBackButton?: boolean
}

const ChatHeader = ({ title, showBackButton }: ChatHeaderProps) => {
  const navigate = useNavigate()

  return (
    <>
      <div className='relative flex items-center gap-2 px-4 py-2 border-b bg-white'>
        {showBackButton && (
          <>
            <button
              className='absolute left-4 flex items-center gap-1 px-4 py-2 rounded-2xl text-sm text-white bg-gray-400 hover:bg-purple-400 cursor-pointer'
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft /> Back
            </button>
          </>
        )}
        {title ? (
          <>
            <div className='flex-1 flex justify-center'>
              <span className='font-bold text-xl text-purple-700 truncate'>{title || 'AI Assistant'}</span>
            </div>
          </>
        ) : (
          <>
            <span className='font-semibold text-purple-700'>AI Assistant</span>
            <span className='text-xs text-green-500'>● Online</span>
          </>
        )}
      </div>
    </>
  )
}

export default ChatHeader
