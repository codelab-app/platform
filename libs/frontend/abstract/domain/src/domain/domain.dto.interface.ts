import type { IEntity } from '@codelab/shared/abstract/types'

export interface ICreateDomainData {
  app: IEntity
  id: string
  name: string
}

export type IUpdateDomainData = ICreateDomainData
