import type { IncidentSummary } from './incident'

export type MessageStatus = 'recording' | 'uploading' | 'waiting' | 'error' | undefined

export type ChatMessage = {
  id: string
  sender: 'user' | 'ai'
  text?: string
  status?: MessageStatus
  structuredOutput?: IncidentSummary
}
