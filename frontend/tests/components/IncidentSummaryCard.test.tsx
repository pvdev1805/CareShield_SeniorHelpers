import { renderWithRouter, screen } from '../test-utils'
import { expect, test } from 'vitest'
import IncidentSummaryCard from '../../app/components/chats/IncidentSummaryCard'

test('renders incident summary and link correctly', () => {
  renderWithRouter(
    <IncidentSummaryCard
      summary={{
        caseNoteId: 12,
        incidentType: 'Fall',
        confidence: 92,
        details: ['Location: Bedroom', 'Severity: High']
      }}
    />
  )

  expect(screen.getByText(/structured output/i)).toBeInTheDocument()
  expect(screen.getByText(/fall/i)).toBeInTheDocument()
  expect(screen.getByText(/confidence: 92%/i)).toBeInTheDocument()
  expect(screen.getByText(/location: bedroom/i)).toBeInTheDocument()
  expect(screen.getByText(/severity: high/i)).toBeInTheDocument()

  const link = screen.getByRole('link', { name: /view case note/i })
  expect(link).toHaveAttribute('href', '/case-notes/12')
})
