export type User = {
  email: string
  firstName: string
  lastName: string
}

export type UserData = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type Guest = User
export type Partner = User

export type GuestData = UserData
export type PartnerData = UserData

export type LoginActionPayload = {
  email: string
  password: string
}

export type AuthStore = {
  user: Guest | Partner | null
  loading: boolean
  error: any
}
