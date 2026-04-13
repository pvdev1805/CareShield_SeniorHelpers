import { useState } from 'react'
import type { Route } from '../../+types/chat'
import ChatHeader from '~/components/chats/ChatHeader'
import ChatInput from '~/components/chats/ChatInput'
import { nanoid } from 'nanoid'
import WelcomePanel from '~/components/chats/WelcomePanel'
import { useNavigate } from 'react-router'

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: 'Chat' }, { name: 'description', content: 'Chat with the AI assistant and get insights.' }]
}

const ChatPage = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const navigate = useNavigate()

  const handleSendFirstMessage = async (message: string) => {
    try {
      /*

      // Call API to create a new chat session and get the first AI response
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstMessage: message })
      })
      const data = await response.json()
      const sessionId = data.sessionId

      */

      // For demo purposes, we'll just generate a random session ID as mock response session ID from backend
      const sessionId = nanoid()

      // Navigate to the chat session page with the new session ID
      navigate(`/sessions/${sessionId}`)
    } catch (error) {
      console.error('Error creating chat session:', error)
    }
  }

  const handleSendFirstAudio = async (audioBlob: Blob) => {
    setIsUploading(true)

    try {
      /*

      // Call API: Send audio to backend, get transcription and AI response
      const formData = new FormData()
      formData.append('audio', audioBlob)
      const response = await fetch(`/api/sessions/audio`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      const sessionId = data.sessionId

      */

      // For demo purposes, we'll just generate a random session ID as mock response session ID from backend
      const sessionId = nanoid()

      // Navigate to the chat session page with the new session ID
      navigate(`/sessions/${sessionId}`)
    } catch (error) {
      console.error('Error sending audio message:', error)
    }

    setIsUploading(false)
  }

  return (
    <div className='flex flex-col h-[calc(100vh-56px)] bg-gray-100'>
      <ChatHeader />
      <WelcomePanel />
      <ChatInput
        onSend={handleSendFirstMessage}
        onSendAudio={handleSendFirstAudio}
        onRecordingStateChange={setIsRecording}
        isUploading={isUploading}
        isRecording={isRecording}
      />
    </div>
  )
}

export default ChatPage
