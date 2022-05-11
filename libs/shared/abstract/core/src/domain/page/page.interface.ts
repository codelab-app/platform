import { IEntity } from '@codelab/shared/abstract/types'

export interface IPage extends IEntity {
  app: { id: string }
  name: string
  rootElement: { id: string }
  providerElement: { id: string }
}
