import type { IEntity, Nullable } from '@codelab/shared/abstract/types'

export interface IPropDTO {
  id: string
  data?: string
  api?: Nullable<IEntity>
}

export type ICreatePropData = IPropDTO

export type IUpdatePropData = IPropDTO
