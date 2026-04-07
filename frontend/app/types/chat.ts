export type MessageStatus = 'recording' | 'uploading' | 'waiting' | 'error' | undefined

export type Message = {
  id: string
  sender: 'user' | 'ai'
  text?: string
  status?: MessageStatus
}
