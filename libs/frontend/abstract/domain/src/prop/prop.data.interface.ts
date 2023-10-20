import type { IPropData, IPropDTO } from '@codelab/shared/abstract/core'

export type ICreatePropData = IPropDTO

export type IUpdatePropData = IPropDTO

export interface IUpdatePropDataWithDefaultValues {
  data: IPropData
  defaultValues: IPropData | undefined
  id: string
}
