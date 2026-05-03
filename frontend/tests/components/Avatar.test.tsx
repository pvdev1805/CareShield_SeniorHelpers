import { renderWithRouter, screen } from '../test-utils'
import { expect, test } from 'vitest'
import Avatar from '../../app/components/chats/Avatar'

test('renders avatar image with src, alt, and custom class', () => {
  renderWithRouter(<Avatar src='/avatar.png' alt='User avatar' className='border-2' />)

  const img = screen.getByAltText('User avatar')

  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute('src', '/avatar.png')
  expect(img).toHaveClass('w-7')
  expect(img).toHaveClass('h-7')
  expect(img).toHaveClass('border-2')
})
