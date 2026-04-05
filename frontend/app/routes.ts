import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/chat', 'layouts/ChatLayout.tsx', [index('routes/chat.tsx')])
] satisfies RouteConfig
