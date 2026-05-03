import { vi } from 'vitest'

// tests/mocks/media.ts
export function mockGetUserMedia(stream = {}) {
  // @ts-expect-error assigning mocked mediaDevices for tests
  global.navigator.mediaDevices = {
    getUserMedia: vi.fn().mockResolvedValue(stream)
  }
}

export class MockMediaRecorder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ondataavailable: ((e: any) => void) | null = null
  onstop: (() => void) | null = null
  start() {}
  stop() {
    if (this.onstop) this.onstop()
  }
  // simulate dataavailable called by test if needed
  emitData(chunk: Blob) {
    if (this.ondataavailable) this.ondataavailable({ data: chunk })
  }
}
