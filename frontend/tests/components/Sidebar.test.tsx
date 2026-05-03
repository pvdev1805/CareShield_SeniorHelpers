import { renderWithRouter, screen, userEvent } from '../test-utils'
import { within } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Sidebar from '../../app/components/Sidebar'

test('renders navigation links', () => {
  renderWithRouter(<Sidebar isMobileOpen={false} onCloseMobileMenu={vi.fn()} />)

  const newChatLinks = screen.getAllByRole('link', { name: /new chat/i })
  const caseNotesLinks = screen.getAllByRole('link', { name: /case notes/i })
  const sessionsLinks = screen.getAllByRole('link', { name: /sessions/i })
  const settingsLinks = screen.getAllByRole('link', { name: /settings/i })

  expect(newChatLinks.map((l) => l.getAttribute('href'))).toContain('/chat')
  expect(caseNotesLinks.map((l) => l.getAttribute('href'))).toContain('/case-notes')
  expect(sessionsLinks.map((l) => l.getAttribute('href'))).toContain('/sessions')
  expect(settingsLinks.map((l) => l.getAttribute('href'))).toContain('/settings')
})

test('calls close handler when a mobile menu link is clicked', async () => {
  const user = userEvent.setup()
  const onCloseMobileMenu = vi.fn()

  renderWithRouter(<Sidebar isMobileOpen={true} onCloseMobileMenu={onCloseMobileMenu} />)

  const closeButton = screen.getByRole('button', { name: /close menu/i })
  const mobileAside = closeButton.closest('aside')
  if (!mobileAside) throw new Error('Mobile aside (menu) not found in DOM')

  const mobileWithin = within(mobileAside)
  await user.click(mobileWithin.getByRole('link', { name: /case notes/i }))

  expect(onCloseMobileMenu).toHaveBeenCalled()
})

test('toggles desktop sidebar collapse state', async () => {
  const user = userEvent.setup()

  renderWithRouter(<Sidebar isMobileOpen={false} onCloseMobileMenu={vi.fn()} />)

  const toggleButton = screen.getByRole('button', { name: /collapse sidebar/i })
  expect(toggleButton).toBeInTheDocument()

  await user.click(toggleButton)

  expect(screen.getByRole('button', { name: /expand sidebar/i })).toBeInTheDocument()
})
