import type { IEntity } from '@codelab/shared/abstract/types'

export interface ICreateDomainData {
  id: string
  app: IEntity
  name: string
}

export type IUpdateDomainData = ICreateDomainData

export interface IDomainDTO {
  id: string
  name: string
  app: IEntity
  domainConfig: { misconfigured: boolean }
  projectDomain: { verified: boolean }
}
