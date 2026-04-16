import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createChatSession } from '~/lib/api'

export const meta = () => {
  return [
    { title: 'Chat' },
    { name: 'description', content: 'Starting new chat session...' }
  ]
}

const ChatPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const startSession = async () => {
      try {
        const session = await createChatSession()
        navigate(`/sessions/${session.id}`)
      } catch (error) {
        console.error('Error creating chat session:', error)
      }
    }

    startSession()
  }, [navigate])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-gray-600 text-lg">Starting new chat session...</p>
    </div>
  )
}

export default ChatPage