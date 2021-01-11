export type ByAppCondition = ByAppTitle | ByUniqueAppId

export type ByAppTitle = {
  title: string
}

export type ByUniqueAppId = {
  id: string
}

export type ByAppConditions = {
  title?: string
}
