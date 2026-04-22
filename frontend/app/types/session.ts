export type SessionListItem = {
  id: number
  session_active: boolean
  started_at: string
  ended_at: string | null
  title: string
  last_message: string | null
  last_message_at: string | null
}
