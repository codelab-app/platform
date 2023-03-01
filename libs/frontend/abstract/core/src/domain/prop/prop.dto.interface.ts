import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IInterfaceType, IInterfaceTypeDTO } from '../type'
import type { PropFragment } from './prop.fragment.graphql.gen'
import type { IPropData } from './prop.model.interface'

// export type IPropDTO = PropFragment & {
//   apiRef?: Maybe<Ref<IInterfaceType>>
// }

export interface IPropDTO<TData extends IPropData = IPropData> {
  id: string
  // data: IData
  data: TData
  // api?: IInterfaceTypeDTO
  api?: Ref<IInterfaceType>
}
