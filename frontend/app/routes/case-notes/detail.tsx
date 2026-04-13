import { useParams, useNavigate } from 'react-router'

type CaseNote = {
  id: string
  title: string
  createdAt: string
  content: string
}

const mockCaseNotes: CaseNote[] = [
  {
    id: '1',
    title: 'Case Note: John upset most of the day',
    createdAt: '2026-04-08 10:18',
    content: 'John was upset for most of the day. He calmed down after lunch and participated in group activities.'
  },
  {
    id: '2',
    title: 'Case Note: Emily fell in the bathroom',
    createdAt: '2026-04-07 19:22',
    content: 'Emily slipped in the bathroom. She had a minor bruise but is otherwise fine.'
  }
]

const CaseNotesDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const caseNote = mockCaseNotes.find((note) => note.id === id)

  if (!caseNote) {
    return (
      <div className='max-w-xl mx-auto mt-12 text-center text-gray-500'>
        Case note not found.
        <br />
        <button
          className='mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'
          onClick={() => navigate('/case-notes')}
        >
          Back to Case Notes
        </button>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center min-h-[calc(100vh-56px)] bg-gray-50'>
      <div className='max-w-xl w-full bg-white rounded-lg shadow p-8 mt-12'>
        <button className='mb-4 text-purple-600 hover:underline' onClick={() => navigate('/case-notes')}>
          ← Back to Case Notes
        </button>
        <h1 className='text-2xl font-bold text-purple-700 mb-2'>{caseNote.title}</h1>
        <div className='text-sm text-gray-500 mb-4'>{caseNote.createdAt}</div>
        <div className='text-gray-800 whitespace-pre-line'>{caseNote.content}</div>
      </div>
    </div>
  )
}

export default CaseNotesDetailPage
