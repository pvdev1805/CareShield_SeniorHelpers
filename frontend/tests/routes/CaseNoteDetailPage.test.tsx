import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { expect, test, vi } from 'vitest'
import CaseNoteDetailPage from '../../app/routes/case-notes/$id'

vi.mock('~/lib/api', () => ({
  getCaseNote: vi.fn()
}))

import { getCaseNote } from '~/lib/api'

test('renders case note detail from API', async () => {
  vi.mocked(getCaseNote).mockResolvedValueOnce({
    id: 7,
    chat_session_id: 3,
    original_text: 'Original message',
    original_language: 'en',
    english_translation: 'Original message',
    incident_occurred: true,
    incident_date: '2026-04-01',
    incident_time: '14:30:00',
    incident_type: 'Fall',
    location: 'Living room',
    injury_status: 'Minor',
    summary: 'Fall in living room',
    metadata_json: {
      conversation_log: [],
      report_type: 'Incident',
      category: 'Safety',
      severity: 'High',
      escalation_required: 'Yes'
    },
    reported_timestamp: '2026-04-01T10:00:00Z'
  })

  render(
    <MemoryRouter initialEntries={['/case-notes/7']}>
      <Routes>
        <Route path='/case-notes/:id' element={<CaseNoteDetailPage />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText(/case note #7/i)).toBeInTheDocument()
  })

  expect(screen.getByText(/fall in living room/i)).toBeInTheDocument()
  expect(screen.getByText(/location:/i).parentElement).toHaveTextContent(/living room/i)
  expect(screen.getByText(/injury status:/i).parentElement).toHaveTextContent(/minor/i)
})
