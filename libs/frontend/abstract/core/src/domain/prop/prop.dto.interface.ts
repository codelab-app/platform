import type { Ref } from 'mobx-keystone'
import type { IInterfaceType } from '../type'

export interface IPropDTO {
  id: string
  data?: string
  api?: Ref<IInterfaceType>
}
