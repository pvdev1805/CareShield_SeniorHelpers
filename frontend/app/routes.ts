import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  layout('routes/_layout.tsx', [
    route('chat', 'routes/chat/_index.tsx'),
    route('sessions', 'routes/sessions/_index.tsx'),
    route('sessions/:id', 'routes/sessions/detail.tsx'),
    route('case-notes', 'routes/case-notes/_index.tsx')
  ])
] satisfies RouteConfig
