import type { IEntity, Nullable } from '@codelab/shared/abstract/types'

export interface IPropDTO {
  api?: Nullable<IEntity>
  data?: string
  id: string
}

export type ICreatePropData = IPropDTO

export type IUpdatePropData = IPropDTO
