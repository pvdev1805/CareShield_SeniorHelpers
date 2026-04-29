import { renderWithRouter, screen, waitFor } from '../test-utils'
import { expect, test, vi } from 'vitest'
import SessionsPage from '../../app/routes/sessions/_index'

// mock the API module
vi.mock('../../app/lib/api', () => ({
  getChatSessions: vi.fn()
}))

import { getChatSessions } from '../../app/lib/api'

test('renders sessions list from API', async () => {
  vi.mocked(getChatSessions).mockResolvedValueOnce([
    {
      id: 1,
      session_active: true,
      started_at: '2026-01-01T00:00:00Z',
      ended_at: null,
      title: 'Test session',
      last_message: 'Hello',
      last_message_at: '2026-01-01T00:01:00Z'
    }
  ])

  renderWithRouter(<SessionsPage />)

  expect(screen.getByText(/loading sessions/i)).toBeInTheDocument()

  await waitFor(() => expect(screen.getByText('Test session')).toBeInTheDocument())
})
