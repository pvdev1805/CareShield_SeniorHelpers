import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getChatSessions } from '~/lib/api'
import type { SessionListItem } from '~/types/session'
import { formatDateTime } from '~/utils/date'

const SessionsPage = () => {
  const [sessions, setSessions] = useState<SessionListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSessions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getChatSessions()
        setSessions(data)
      } catch (error) {
        console.error('Error loading sessions:', error)
        setError('Failed to load sessions. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadSessions()
  }, [])

  return (
    <div className='flex flex-col h-[calc(100vh-56px)] bg-gray-100'>
      <div className='max-w-2xl mx-auto mt-8 w-full px-4'>
        <h2 className='text-2xl text-(--primary-color) font-bold mb-4'>Your Chat Sessions</h2>

        {isLoading ? (
          <div className='text-gray-500 text-center py-12'>Loading sessions...</div>
        ) : error ? (
          <div className='text-red-500 text-center py-12'>{error}</div>
        ) : sessions.length === 0 ? (
          <div className='text-gray-500 text-center py-12'>
            No sessions found.
            <br />
            Start a new conversation from the <b>Chat</b> page!
          </div>
        ) : (
          <ul className='space-y-4'>
            {sessions.map((session) => {
              const displayTime = formatDateTime(session.last_message_at, session.started_at)

              return (
                <li key={session.id}>
                  <Link
                    to={`/sessions/${session.id}`}
                    className='block p-4 bg-white rounded-lg shadow transition-all duration-200
                      hover:bg-purple-50 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-purple-400'
                  >
                    <div className='font-semibold text-purple-700 truncate'>{session.title}</div>

                    <div className='text-sm text-gray-500'>{displayTime}</div>

                    <div className='text-gray-700 mt-1 truncate'>{session.last_message ?? 'No messages yet.'}</div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SessionsPage
