import { render, screen } from '../test-utils'
import { Routes, Route, MemoryRouter } from 'react-router'
import { expect, test, vi } from 'vitest'
import SessionDetailPage from '../../app/routes/sessions/detail'

vi.mock('~/lib/api', () => ({
  getMessages: vi.fn(),
  getCaseNoteBySession: vi.fn(),
  sendMessage: vi.fn(),
  generateCaseNote: vi.fn()
}))

test('loads and displays session messages', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { getMessages, getCaseNoteBySession } = (await import('~/lib/api')) as any
  getMessages.mockResolvedValue([
    { id: 1, content: 'Hi there', message_sender_role: 'user' },
    { id: 2, content: 'Hello — how can I help?', message_sender_role: 'assistant' }
  ])
  getCaseNoteBySession.mockResolvedValue(null)

  render(
    <MemoryRouter initialEntries={['/sessions/1']}>
      <Routes>
        <Route path='/sessions/:id' element={<SessionDetailPage />} />
      </Routes>
    </MemoryRouter>
  )

  expect(await screen.findByText(/Hi there/i)).toBeInTheDocument()
  expect(await screen.findByText(/Hello — how can I help\?/i)).toBeInTheDocument()
})
