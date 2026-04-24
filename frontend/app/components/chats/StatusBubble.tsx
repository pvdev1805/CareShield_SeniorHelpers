interface StatusBubbleProps {
  status: 'recording' | 'uploading' | 'waiting' | 'error'
}

const statusConfig = {
  recording: {
    className: 'bg-black text-white',
    icon: <span className='mr-2 animate-pulse text-red-500'>●</span>,
    text: 'Recording...'
  },
  uploading: {
    className: 'bg-gray-800 text-white',
    icon: <span className='mr-2 animate-spin'>⏳</span>,
    text: 'Uploading...'
  },
  waiting: {
    className: 'bg-gray-800 text-white',
    icon: <span className='mr-2 animate-pulse'>...</span>,
    text: 'Waiting for AI response...'
  },
  error: {
    className: 'bg-red-600 text-white',
    icon: null,
    text: 'Error processing audio'
  }
}

const StatusBubble = ({ status }: StatusBubbleProps) => {
  const cfg = statusConfig[status]
  return (
    <div className={`flex items-center px-4 py-2 rounded-lg ${cfg.className}`}>
      {cfg.icon}
      {cfg.text}
    </div>
  )
}

export default StatusBubble
