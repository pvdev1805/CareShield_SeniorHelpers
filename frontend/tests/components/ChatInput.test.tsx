import { renderWithRouter, screen, userEvent } from '../test-utils'
import { expect, test, vi } from 'vitest'
import ChatInput from '../../app/components/chats/ChatInput'

test('calls onSend when submitting text', async () => {
  const onSend = vi.fn()
  const onSendAudio = vi.fn()
  const onRecordingStateChange = vi.fn()

  renderWithRouter(
    <ChatInput
      onSend={onSend}
      onSendAudio={onSendAudio}
      isUploading={false}
      isRecording={false}
      onRecordingStateChange={onRecordingStateChange}
    />
  )

  await userEvent.type(screen.getByPlaceholderText(/type or press the mic/i), 'Hello')
  await userEvent.click(screen.getByLabelText(/send message/i))

  expect(onSend).toHaveBeenCalledWith('Hello')
})
