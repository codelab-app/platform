import type { IPropDTO } from '@codelab/shared/abstract/core'
import type { IPropData } from './prop.model.interface'

export type ICreatePropData = IPropDTO

export type IUpdatePropData = IPropDTO

export interface IUpdatePropDataWithDefaultValues {
  data: IPropData
  defaultValues: IPropData | undefined
  id: string
}
