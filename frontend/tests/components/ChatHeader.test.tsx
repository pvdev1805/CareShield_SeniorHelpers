import { renderWithRouter, screen } from '../test-utils'
import { expect, test } from 'vitest'
import ChatHeader from '../../app/components/chats/ChatHeader'

test('renders title and back button when showBackButton is enabled', () => {
  renderWithRouter(<ChatHeader title='Session 1' showBackButton />)

  expect(screen.getByText('Session 1')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})

test('renders default header content when title is not provided', () => {
  renderWithRouter(<ChatHeader />)

  expect(screen.getByText(/ai assistant/i)).toBeInTheDocument()
  expect(screen.getByText(/online/i)).toBeInTheDocument()
})
