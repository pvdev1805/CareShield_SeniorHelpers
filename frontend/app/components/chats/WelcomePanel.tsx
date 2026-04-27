interface WelcomePanelProps {
  userName?: string
}

const WelcomePanel = ({ userName = 'User' }: WelcomePanelProps) => {
  return (
    <>
      <div className='flex items-center justify-center h-full py-4'>
        <div className=''>
          <div className='text-3xl font-bold mb-2 text-purple-700'>👋 Hi {userName},</div>
          <div className='text-xl mb-2 text-gray-700'>How can I help you today?</div>
          <div className='mb-8 text-gray-500 max-w-md'>
            Just describe your case, ask a question, or report an incident to get started.
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomePanel
