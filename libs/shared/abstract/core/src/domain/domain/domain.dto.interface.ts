import { DomainFragment } from './domain.fragment.graphql.gen'

export interface ICreateDomainDTO {
  appId: string
  name: string
  id?: string
}

export type IDomainDTO = DomainFragment

export interface IUpdateDomainDTO extends ICreateDomainDTO {
  id: string
}

export interface IDomainExport {
  id: string
  name: string
  app: {
    id: string
  }
}
