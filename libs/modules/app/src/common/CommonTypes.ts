export type ByAppCondition = ByAppTitle | ByAppId

export type ByAppTitle = {
  title: string
}

export type ByAppId = {
  id: string
}

export type ByAppConditions = {
  title?: string
}
