export interface GatewayPosition {
  id: string
  name: string
  lat: number
  long: number
  altitude: number,
  locality?: string
}

export interface SearchOption {
  lat: number
  long: number
  label: string
}