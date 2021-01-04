export type Success<T> = {
  success: true
  results: T
}

export type Failure = {
  success: false
  message: string
  code?: string
}

export type Result<T> = {
  loading?: boolean
  data: T
}
