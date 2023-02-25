import type { IEntity } from '@codelab/shared/abstract/types'
import type { DomainFragment } from './domain.fragment.graphql.gen'

export interface ICreateDomainDTO {
  id: string
  app: IEntity
  name: string
}

export type IDomainDTO = DomainFragment

export type IUpdateDomainDTO = ICreateDomainDTO
