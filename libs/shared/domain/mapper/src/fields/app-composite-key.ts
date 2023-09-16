import type { IEntity } from '@codelab/shared/abstract/types'

export const appCompositeKey = (appName: string, user: IEntity) => {
  return `${user.id}-${appName}`
}
