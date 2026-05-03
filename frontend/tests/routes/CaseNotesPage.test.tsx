import { renderWithRouter, screen, waitFor } from '../test-utils'
import { expect, test, vi } from 'vitest'
import CaseNotesPage from '../../app/routes/case-notes/_index'

vi.mock('~/lib/api', () => ({
  getCaseNotes: vi.fn()
}))

import { getCaseNotes } from '~/lib/api'

test('renders case notes from API', async () => {
  vi.mocked(getCaseNotes).mockResolvedValueOnce([
    {
      id: 1,
      summary: 'Patient fell in the bedroom',
      reported_timestamp: '2026-04-01T10:00:00Z'
    }
  ])

  renderWithRouter(<CaseNotesPage />)

  expect(screen.getByRole('heading', { name: /case notes/i })).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText(/case note #1/i)).toBeInTheDocument()
  })

  expect(screen.getByText(/patient fell in the bedroom/i)).toBeInTheDocument()
})
