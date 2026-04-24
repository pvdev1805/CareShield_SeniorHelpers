const IncidentSummaryCard = () => {
  return (
    <>
      <div className='max-w-2xl rounded-xl border bg-(--primary-color) p-4 shadow mb-2'>
        <div className='flex items-center justify-between mb-2'>
          <span className='font-semibold text-white'>Structured Output</span>
          <span className='text-xs bg-green-100 text-green-700 px-2 py-1 rounded'>CONFIDENCE 96.69%</span>
        </div>
        <div className='bg-white text-gray-800 p-4 rounded'>
          <div className='mb-1 flex flex-col gap-20 md:flex-row md:space-x-4'>
            <div className='mb-1 rounded'>
              <b>INCIDENT TYPE:</b> Fall
            </div>
            <div className='mb-1 rounded'>
              <b>PATIENT:</b> Alex Smith
            </div>
          </div>
          <div className='mb-1 rounded'>
            <b>STATUS:</b> Unconscious, breathing, bleeding from head wound
          </div>
          <div className='mb-1 '>
            <b>Details:</b>
            <ul className='list-disc ml-5'>
              <li>Patient was found on the floor by a passerby.</li>
              <li>Patient is unconscious but breathing.</li>
              <li>There is visible bleeding from a head wound.</li>
            </ul>
          </div>
        </div>
        {/* Add buttons for Confirm, Edit, Save if needed */}
      </div>
    </>
  )
}

export default IncidentSummaryCard
