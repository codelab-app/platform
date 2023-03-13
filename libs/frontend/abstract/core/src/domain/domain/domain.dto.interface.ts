import type { IEntity, Maybe } from '@codelab/shared/abstract/types'

export interface ICreateDomainData {
  app: IEntity
  id: string
  name: string
}

export type IUpdateDomainData = ICreateDomainData

export interface IDomainDTO {
  app: IEntity
  domainConfig: Maybe<{ misconfigured: boolean }>
  id: string
  name: string
  projectDomain: Maybe<{ verified: boolean }>
}
