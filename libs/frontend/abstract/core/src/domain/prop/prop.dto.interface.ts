import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IInterfaceType, IInterfaceTypeDTO } from '../type'
import type { PropFragment } from './prop.fragment.graphql.gen'
import type { IPropData } from './prop.model.interface'

export interface IPropDTO {
  id: string
  data: string
  api?: Ref<IInterfaceType>
}
