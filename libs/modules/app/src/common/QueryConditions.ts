export type ByAppCondition = ByAppTitle | ByAppId

export type ByAppTitle = {
  title: string
}

export const isAppTitle = (value: ByAppCondition): value is ByAppTitle =>
  typeof (value as ByAppTitle).title !== 'undefined'

export type ByAppId = {
  appId: string
}

export const isAppId = (value: ByAppCondition): value is ByAppId =>
  typeof (value as ByAppId).appId !== 'undefined'

export type ByAppConditions = {
  title?: string
}
