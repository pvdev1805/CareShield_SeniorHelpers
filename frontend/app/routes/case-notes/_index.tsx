import { useEffect, useState } from 'react'
import { Link } from 'react-router'

type CaseNote = {
  id: number
  summary: string
  reported_timestamp: string
}

const CaseNotesPage = () => {
  const [caseNotes, setCaseNotes] = useState<CaseNote[]>([])

  useEffect(() => {
    fetch('http://localhost:8000/api/case-notes')
      .then((res) => res.json())
      .then((data) => setCaseNotes(data))
      .catch((err) => console.error('Error fetching case notes:', err))
  }, [])

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return isNaN(date.getTime())
      ? 'Unknown date'
      : date.toLocaleString()
  }

  return (
    <div className='flex flex-col h-[calc(100vh-56px)] bg-gray-100'>
      <div className='max-w-2xl mx-auto mt-8 w-full'>
        <h2 className='text-2xl text-(--primary-color) font-bold mb-4'>
          Case Notes
        </h2>

        {caseNotes.length === 0 ? (
          <div className='text-gray-500 text-center py-12'>
            No case notes found.
            <br />
            Generate a case note from the <b>Chat</b> page!
          </div>
        ) : (
          <ul className='space-y-4'>
            {caseNotes.map((note) => (
              <li key={note.id}>
                <Link
                  to={`/case-notes/${note.id}`}
                  className='block p-4 bg-white rounded-lg shadow transition-all duration-200
                    hover:bg-purple-50 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-purple-400'
                >
                  <div className='font-semibold text-purple-700'>
                    Case Note #{note.id}
                  </div>
                  <div className='text-sm text-gray-500'>
                    {formatDate(note.reported_timestamp)}
                  </div>
                  <div className='text-gray-700 mt-1 truncate'>
                    {note.summary}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default CaseNotesPage