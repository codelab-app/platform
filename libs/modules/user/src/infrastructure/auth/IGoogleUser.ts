export interface IGoogleUser {
  userId: string
  name: string
  username: string | undefined
  picture: string | undefined
  roles: Array<string>
}
