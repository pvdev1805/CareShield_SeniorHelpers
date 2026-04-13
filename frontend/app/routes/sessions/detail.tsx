import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ChatHeader from '~/components/chats/ChatHeader'
import ChatInput from '~/components/chats/ChatInput'
import ChatMessages from '~/components/chats/ChatMessages'
import type { ChatMessage } from '~/types/chat'

const SessionDetailPage = () => {
  const { id: sessionId } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [sessionTitle, setSessionTitle] = useState('')

  useEffect(() => {
    /*
    
    // Call API: to get session details and messages by sessionId from backend
    fetch(`/api/sessions/${sessionId}`)
      .then((response) => response.json())
      .then((data) => {
        setSessionTitle(data.title)
        setMessages(data.messages)
      })

    */

    // Mock data to demo session detail and test UI
    setSessionTitle('Incident: Emily fell in the bathroom')
    setMessages([
      { id: nanoid(), sender: 'user', text: 'Emily fell over in the bathroom while I was on shift today.' },
      { id: nanoid(), sender: 'ai', text: 'Was Emily injured as a result of falling?' },
      { id: nanoid(), sender: 'user', text: 'Just a minor bruise.' }
    ])
  }, [sessionId])

  const handleSend = (text: string) => {
    const id = nanoid()
    setMessages((msgs) => [...msgs, { id, sender: 'user', text }])

    /*

    // Call API: send user message to backend, get AI response, and update messages state
    fetch(`/api/sessions/${sessionId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
      .then((response) => response.json())
      .then((aiResponse) => {
        setMessages((msgs) => [...msgs, { id: nanoid(), sender: 'ai', text: aiResponse.text }])
      })
    
    */

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { id: nanoid(), sender: 'ai', text: 'This is a simulated AI response.' }])
    }, 1000)
  }

  const handleSendAudio = async (audioBlob: Blob) => {
    const id = nanoid()
    setMessages((msgs) => [...msgs, { id, sender: 'user', status: 'uploading' }])
    setIsUploading(true)

    try {
      /*
      
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

      */

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
    <>
      <div className='flex flex-col h-[calc(100vh-56px)] bg-gray-100'>
        <ChatHeader title={sessionTitle} showBackButton />
        <ChatMessages messages={messages} />
        <ChatInput
          onSend={handleSend}
          onSendAudio={handleSendAudio}
          onRecordingStateChange={handleRecordingStateChange}
          isUploading={isUploading}
          isRecording={isRecording}
        />
      </div>
    </>
  )
}

export default SessionDetailPage
