import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/chat', 'routes/_layout.tsx', [index('routes/chat/_index.tsx')])
] satisfies RouteConfig
