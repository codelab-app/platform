import { Nullable } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { IElement } from '../element'

export interface IPropMapBinding {
  id: string
  sourceKey: string
  targetKey: string
  targetElement: Nullable<Ref<IElement>>
}
