export interface Gateway {
  id: string
  name: string
  lat: number
  long: number
  altitude: number,
  earnings: number,
  locality?: string
}

export interface SearchOption {
  lat: number
  long: number
  label: string
}