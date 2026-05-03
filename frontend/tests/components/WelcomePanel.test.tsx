import { renderWithRouter, screen } from '../test-utils'
import { expect, test } from 'vitest'
import WelcomePanel from '../../app/components/chats/WelcomePanel'

test('renders default welcome text', () => {
  renderWithRouter(<WelcomePanel />)

  expect(screen.getByText(/hi user/i)).toBeInTheDocument()
  expect(screen.getByText(/how can i help you today/i)).toBeInTheDocument()
  expect(
    screen.getByText(/just describe your case, ask a question, or report an incident to get started/i)
  ).toBeInTheDocument()
})

test('renders custom username', () => {
  renderWithRouter(<WelcomePanel userName='Alex' />)

  expect(screen.getByText(/hi alex/i)).toBeInTheDocument()
})
