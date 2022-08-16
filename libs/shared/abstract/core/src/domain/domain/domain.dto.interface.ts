export interface ICreateDomainDTO {
  appId: string
  name: string
  id?: string
}

export interface IUpdateDomainDTO extends ICreateDomainDTO {
  id: string
}

export type IDeleteDomain = Pick<IUpdateDomainDTO, 'id'>

export type IDomainExport = Pick<IUpdateDomainDTO, 'id' | 'name'> & {
  app: {
    id: string
  }
}
