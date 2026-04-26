import { Link } from 'react-router'
import type { IncidentSummary } from '~/types/incident'

type IncidentSummaryCardProps = {
  summary: IncidentSummary
}

const IncidentSummaryCard = ({ summary }: IncidentSummaryCardProps) => {
  return (
    <div className='max-w-md rounded-xl border bg-(--primary-color) p-3 shadow mb-2'>
      <div className='flex items-center justify-between mb-2'>
        <span className='font-semibold text-white'>Structured Output</span>

        {summary.confidence !== undefined && (
          <span className='text-xs bg-white text-green-700 px-2 py-1 rounded-full font-semibold'>
            CONFIDENCE: {summary.confidence}%
          </span>
        )}
      </div>

      <div className='bg-white text-gray-800 p-4 rounded-lg'>
        <div className='mb-3'>
          <div className='text-xs font-semibold text-gray-500 uppercase mb-1'>Incident Type</div>
          <div className='font-medium text-gray-900'>{summary.incidentType}</div>
        </div>

        {summary.details.length > 0 && (
          <div className='mb-4'>
            <div className='text-xs font-semibold text-gray-500 uppercase mb-1'>Details</div>

            <ul className='list-disc ml-5 space-y-1 text-sm'>
              {summary.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        )}

        <Link
          to={`/case-notes/${summary.caseNoteId}`}
          className='inline-flex w-full items-center justify-center rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800'
        >
          View Case Note
        </Link>
      </div>
    </div>
  )
}

export default IncidentSummaryCard
