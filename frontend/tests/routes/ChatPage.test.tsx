import { render, screen } from '../test-utils'
import userEvent from '@testing-library/user-event'
import { Routes, Route, MemoryRouter } from 'react-router'
import { expect, test, vi } from 'vitest'
import ChatPage from '../../app/routes/chat/_index'

vi.mock('~/lib/api', () => ({
  startChatSession: vi.fn(),
  startChatSessionWithAudio: vi.fn()
}))

test('submitting first message starts session and navigates', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { startChatSession } = (await import('~/lib/api')) as any
  startChatSession.mockResolvedValue({ chat_session_id: 42 })

  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={['/chat']}>
      <Routes>
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/sessions/:id' element={<div>Session page</div>} />
      </Routes>
    </MemoryRouter>
  )

  // ChatInput renders an input and a send button; locate by role/placeholder as in your component
  const input = screen.getByRole('textbox')
  await user.type(input, 'Hello{Enter}')

  // Wait for navigation to session route
  expect(await screen.findByText(/Session page/i)).toBeInTheDocument()
})
