import { expect, test } from 'vitest'
import { loader as homeLoader } from '../../app/routes/home'

test('home loader redirects to /chat', () => {
  const res = homeLoader()
  // react-router redirect returns a Response-like object with Location header
  expect(res.headers.get('Location')).toBe('/chat')
})
