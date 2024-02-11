import type { IPropData, IPropDto } from '@codelab/shared/abstract/core'

export type ICreatePropData = IPropDto

export type IUpdatePropData = IPropDto

export interface IUpdatePropDataWithDefaultValues {
  data: IPropData
  defaultValues: IPropData | undefined
  id: string
}
