interface WelcomePanelProps {
  onCategorySelect?: (category: string) => void
  categories?: string[]
  userName?: string
}

const defaultCategories = ['Incident Register', 'Feedback & Complaints', 'Normal Case Note']

const WelcomePanel = ({ onCategorySelect, categories = defaultCategories, userName = 'User' }: WelcomePanelProps) => {
  const handleCategorySelect = (category: string) => {
    if (onCategorySelect) {
      onCategorySelect(category)
    }
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center h-full py-4'>
        <div className='flex flex-col justify-start mb-4 px-2'>
          <div className='text-3xl font-bold mb-2 text-purple-700'>👋 Hi {userName},</div>
          <div className='text-xl mb-2 text-gray-700'>Where should we start?</div>
          <div className='mb-4 text-gray-500 max-w-md'>Select a category to begin or type your message below.</div>
        </div>
        <div className='flex flex-col flex-wrap gap-4 mb-10'>
          {categories.map((category) => (
            <button
              key={category}
              className='px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition'
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default WelcomePanel
