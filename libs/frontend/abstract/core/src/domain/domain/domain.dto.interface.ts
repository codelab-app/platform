import type { IEntity, Maybe } from '@codelab/shared/abstract/types'

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
  domainConfig: Maybe<{ misconfigured: boolean }>
  projectDomain: Maybe<{ verified: boolean }>
}
