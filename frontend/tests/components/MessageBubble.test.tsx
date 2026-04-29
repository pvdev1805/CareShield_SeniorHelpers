import { renderWithRouter, screen } from '../test-utils'
import { expect, test } from 'vitest'
import MessageBubble from '../../app/components/chats/MessageBubble'

test('renders user message with user styling', () => {
  renderWithRouter(<MessageBubble sender='user' text='Hello from user' />)

  const message = screen.getByText('Hello from user')
  expect(message).toBeInTheDocument()
  expect(message.parentElement).toHaveClass('flex')
  expect(message.parentElement?.firstElementChild).toHaveClass('bg-purple-600')
  expect(message.parentElement?.firstElementChild).toHaveClass('text-white')
})

test('renders ai message with ai styling', () => {
  renderWithRouter(<MessageBubble sender='ai' text='Hello from ai' />)

  const message = screen.getByText('Hello from ai')
  expect(message).toBeInTheDocument()
  expect(message.parentElement).toHaveClass('flex')
  expect(message.parentElement?.firstElementChild).toHaveClass('bg-white')
  expect(message.parentElement?.firstElementChild).toHaveClass('text-gray-900')
})
