export interface ICreateDomainDTO {
  appId: string
  name: string
  id?: string
}

export interface IUpdateDomainDTO extends ICreateDomainDTO {
  id: string
}

export type IDomainExport = {
  id: string
  name: string
  app: {
    id: string
  }
}
