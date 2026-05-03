import { renderWithRouter, screen } from '../test-utils'
import { expect, test } from 'vitest'
import StatusBubble from '../../app/components/chats/StatusBubble'

test('renders typing status', () => {
  renderWithRouter(<StatusBubble status='typing' />)

  expect(screen.getByText(/ai is structuring your note/i)).toBeInTheDocument()
})

test('renders error status', () => {
  renderWithRouter(<StatusBubble status='error' />)

  expect(screen.getByText(/error processing audio/i)).toBeInTheDocument()
})
