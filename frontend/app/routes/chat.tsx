import { useState } from 'react'
import type { Route } from './+types/chat'
import ChatHeader from '~/components/chats/ChatHeader'
import ChatMessages from '~/components/chats/ChatMessages'
import ChatInput from '~/components/chats/ChatInput'
import { nanoid } from 'nanoid'
import WelcomePanel from '~/components/chats/WelcomePanel'

type ChatMessage = {
  id: string
  sender: 'user' | 'ai'
  text?: string
  status?: 'recording' | 'uploading' | 'waiting' | 'error'
}

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: 'Chat' }, { name: 'description', content: 'Chat with the AI assistant and get insights.' }]
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nanoid(), sender: 'ai', text: 'Hello! How can I help you today?' },
    { id: nanoid(), sender: 'user', text: 'I want to report the incident.' }
  ])

  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleSendAudio = async (audioBlob: Blob) => {
    const id = nanoid()
    setMessages((msgs) => [...msgs, { id, sender: 'user', status: 'uploading' }])
    setIsUploading(true)

    try {
      // Send audio to backend, get transcription and AI response
      const formData = new FormData()
      formData.append('audio', audioBlob)
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      // Update message with transcribed text
      const transcribedText = data.text || 'Transcription failed'
      setMessages((msgs) =>
        msgs.filter((msg) => msg.id !== id).concat({ id, sender: 'user', text: transcribedText, status: 'waiting' })
      )

      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        setMessages((msgs) =>
          msgs
            .filter((msg) => !(msg.sender !== 'ai' && msg.status === 'waiting'))
            .concat({
              id: nanoid(),
              sender: 'ai',
              text: 'Thanks for the information. This is the response based on your audio.'
            })
        )
      })
    } catch (error) {
      console.error('Error uploading audio:', error)
      setMessages((msgs) => msgs.filter((msg) => msg.id !== id).concat({ id, sender: 'user', status: 'error' }))
    }

    setIsUploading(false)
  }

  const handleSend = (text: string) => {
    setMessages((msgs) => [...msgs, { id: nanoid(), sender: 'user', text }])
  }

  // Handle recording state changes to show "Recording..." message
  const handleRecordingStateChange = (recording: boolean) => {
    setIsRecording(recording)
    if (recording) {
      setMessages((msgs) => [
        ...msgs,
        {
          id: nanoid(),
          sender: 'user',
          status: 'recording'
        }
      ])
    } else {
      setMessages((msgs) => msgs.filter((msg) => !(msg.sender === 'user' && msg.status === 'recording')))
    }
  }

  return (
    <div className='flex flex-col h-[calc(100vh-56px)] bg-gray-100'>
      <ChatHeader />
      <WelcomePanel />
      {/* <ChatMessages messages={messages} /> */}
      <ChatInput
        onSend={handleSend}
        onSendAudio={handleSendAudio}
        onRecordingStateChange={handleRecordingStateChange}
        isUploading={isUploading}
        isRecording={isRecording}
      />
    </div>
  )
}

export default Chat
