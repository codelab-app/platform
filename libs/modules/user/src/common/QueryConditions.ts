export type ByUserCondition = ByUserEmail | ByUserId

export type ByUserId = {
  userId: string
}

export const isUserId = (value: ByUserCondition): value is ByUserId => {
  return typeof (value as ByUserId).userId !== 'undefined'
}

export type ByUserEmail = {
  email: string
}

export const isUserEmail = (value: ByUserCondition): value is ByUserEmail => {
  return typeof (value as ByUserEmail).email !== 'undefined'
}
