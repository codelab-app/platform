export type FindUserBy = FindUserByEmail | FindUserByID

export type FindUserByEmail = {
  email: string
}

export type FindUserByID = {
  id: string
}
