import { Nullable } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { IElement } from '../element'
import { IPropData } from './prop.model.interface'
import { IPropMapBindingDTO } from './prop-map-binding.dto.interface'

export interface IPropMapBinding
  extends ICacheService<IPropMapBindingDTO, IPropMapBinding> {
  id: string
  sourceKey: string
  targetKey: string
  targetElement: Nullable<Ref<IElement>>
  applyBindings(sourceProps: IPropData): IPropData
}
