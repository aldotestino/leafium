export interface Gateway {
  id: string
  name: string
  lat: number
  long: number
  altitude: number
  earnings: number
  updatedAt: number
  isOffline?: boolean
  locality?: string
}

export interface SearchOption {
  lat: number
  long: number
  label: string
}