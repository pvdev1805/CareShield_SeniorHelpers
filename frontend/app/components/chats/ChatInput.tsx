import { useState, useRef } from 'react'
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane } from 'react-icons/fa'

interface ChatInputProps {
  onSend: (text: string) => void
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [value, setValue] = useState('')
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  // Start voice recognition
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice recognition.')
      return
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setValue((prev) => (prev ? prev + ' ' : '') + transcript)
      setListening(false)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognition.start()
    setListening(true)
    recognitionRef.current = recognition
  }

  // Stop voice recognition
  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSend(value)
      setValue('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <form onSubmit={handleSend} className='flex items-center gap-2 px-4 py-3 border-t bg-white relative'>
      {/* Voice button - left */}
      <button
        type='button'
        onClick={listening ? stopListening : startListening}
        className={`absolute left-6 p-2 rounded-full ${listening ? 'bg-purple-100' : 'bg-gray-100'} hover:bg-purple-200 transition-colors`}
        aria-label={listening ? 'Stop recording' : 'Start voice input'}
        style={{ zIndex: 2 }}
      >
        {listening ? (
          <FaMicrophoneSlash className='w-5 h-5 text-purple-700' />
        ) : (
          <FaMicrophone className='w-5 h-5 text-purple-700' />
        )}
      </button>

      {/* Input - center */}
      <input
        className='flex-1 border rounded-full px-12 py-3 focus:outline-none bg-gray-50 text-gray-900 placeholder-gray-400'
        placeholder='Type your note or speak...'
        value={value}
        onChange={handleChange}
        autoComplete='off'
        style={{ textIndent: 8, paddingRight: 48 }}
      />

      {/* Send button - right */}
      <button
        type='submit'
        className='absolute right-6 bg-purple-700 text-white p-2 rounded-full hover:bg-purple-800 flex items-center justify-center transition-colors'
        aria-label='Send message'
        style={{ zIndex: 2 }}
      >
        <FaPaperPlane className='w-5 h-5' />
      </button>
    </form>
  )
}

export default ChatInput
