import type { ICacheService } from '../../service'
import type { IElementRef } from '../element'
import type { IPropData } from './prop.model.interface'
import type { IPropMapBindingDTO } from './prop-map-binding.dto.interface'

export interface IPropMapBinding
  extends ICacheService<IPropMapBindingDTO, IPropMapBinding> {
  id: string
  sourceKey: string
  targetKey: string
  targetElementId: IElementRef
  applyBindings(sourceProps: IPropData): IPropData
}
