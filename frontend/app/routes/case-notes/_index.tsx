import { useEffect, useState } from 'react'
import { Link } from 'react-router'

type CaseNote = {
  id: string
  title: string
  createdAt: string
  desc?: string
}

const CaseNotesPage = () => {
  const [caseNotes, setCaseNotes] = useState<CaseNote[]>([])

  useEffect(() => {
    /*

    // Call API: fetch case notes for the user from backend
    fetch(`api/case-notes`)
      .then((res) => res.json())
      .then(setCaseNotes)

    */

    // Mock data to demo case notes list and test UI
    setCaseNotes([
      {
        id: 'note1',
        title: 'Case Note: Emily fell in the bathroom',
        createdAt: '2026-04-07 19:22',
        desc: 'Emily was walking to the bathroom when she slipped on a wet floor and fell. She hit her head but is conscious and responsive. No visible injuries.'
      },
      {
        id: 'note2',
        title: 'Case Note: John upset most of the day',
        createdAt: '2026-04-08 10:18',
        desc: 'John has been very upset today, crying frequently and refusing to eat. He mentioned missing his family and feeling lonely.'
      }
    ])
  }, [])

  return (
    <>
      <div className='flex flex-col h-[calc(100vh-56px)] bg-gray-100'>
        <div className='max-w-2xl mx-auto mt-8 w-full'>
          <h2 className='text-2xl text-(--primary-color) font-bold mb-4'>Case Notes</h2>
          {caseNotes.length === 0 ? (
            <div className='text-gray-500 text-center py-12'>No case notes generated.</div>
          ) : (
            <ul className='space-y-4'>
              {caseNotes.map((note) => (
                <li key={note.id} className='mb-2'>
                  <Link
                    to={`/case-notes/${note.id}`}
                    className='block bg-white border p-4 rounded-lg shadow hover:bg-gray-50 hover:shadow-lg hover:scale-101 transition-all duration-200 transform'
                  >
                    <div className='text-lg font-semibold text-blue-600'>{note.title}</div>
                    {note.desc && <p className='text-gray-600 mt-2'>{note.desc}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default CaseNotesPage
