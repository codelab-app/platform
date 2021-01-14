import { ByAppId } from '@codelab/modules/app'

export type ByPageCondition = ByPageId

export type ByPageId = {
  pageId: string
}

export type ByPageConditions = ByAppId

export const isPageId = (value: ByPageId): value is ByPageId => {
  return (value as ByPageId).pageId !== undefined
}
