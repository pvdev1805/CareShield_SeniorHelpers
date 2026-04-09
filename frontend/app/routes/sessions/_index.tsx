import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import ChatHeader from '~/components/chats/ChatHeader'

type ChatSession = {
  id: string
  title: string
  createdAt: string
  lastMessage?: string
}

const SessionsPage = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    /*

    // Call API to fetch chat sessions for the user from backend
    // fetch('/api/sessions').then(res => res.json()).then(setSessions)
    
    */

    // Mock data to demo sessions list and test UI
    setSessions([
      {
        id: 'abc123',
        title: 'Incident: Emily fell in the bathroom',
        createdAt: '2026-04-07 19:22',
        lastMessage: 'Just a minor bruise.'
      },
      {
        id: 'def456',
        title: 'Case Note: John upset most of the day',
        createdAt: '2026-04-08 10:18',
        lastMessage: 'Yes, that is correct.'
      }
    ])
  }, [])

  return (
    <div className='flex flex-col h-[calc(100vh-56px)] bg-gray-100'>
      <div className='max-w-2xl mx-auto mt-8 w-full'>
        <h2 className='text-2xl text-(--primary-color) font-bold mb-4'>Your Chat Sessions</h2>
        {sessions.length === 0 ? (
          <div className='text-gray-500 text-center py-12'>
            No sessions found.
            <br />
            Start a new conversation from the <b>Chat</b> page!
          </div>
        ) : (
          <ul className='space-y-4'>
            {sessions.map((session) => (
              <li
                key={session.id}
                className='p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-purple-50 transition'
                onClick={() => navigate(`/sessions/${session.id}`)}
              >
                <div className='font-semibold text-purple-700'>{session.title}</div>
                <div className='text-sm text-gray-500'>{session.createdAt}</div>
                {session.lastMessage && <div className='text-gray-700 mt-1 truncate'>{session.lastMessage}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SessionsPage
