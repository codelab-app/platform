import type { IEntity } from '@codelab/shared/abstract/types'

export interface ICreateConfigData {
  app: IEntity
  id: string
  name: string
}

export type IUpdateConfigData = ICreateConfigData

export interface IConfigDTO {
  app: IEntity
  id: string
  name: string
}
