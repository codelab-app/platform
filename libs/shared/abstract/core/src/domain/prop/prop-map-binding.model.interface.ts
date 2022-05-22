import { Nullable } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { IElement } from '../element'
import { IPropData } from './prop.interface'
import { IPropMapBindingDTO } from './prop-map-binding.dto.interface'

export interface IPropMapBinding {
  id: string
  sourceKey: string
  targetKey: string
  targetElement: Nullable<Ref<IElement>>

  applyBindings(sourceProps: IPropData): IPropData
  updateCache(fragment: IPropMapBindingDTO): void
}
