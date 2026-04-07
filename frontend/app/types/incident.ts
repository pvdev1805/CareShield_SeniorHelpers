export interface IncidentSummary {
  incidentType: string
  patient: string
  status: string
  details: string[]
  confidence?: number
  createdAt?: string
}
