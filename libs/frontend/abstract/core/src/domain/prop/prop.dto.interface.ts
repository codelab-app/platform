import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IInterfaceType, IInterfaceTypeDTO } from '../type'
import type { PropFragment } from './prop.fragment.graphql.gen'

// export type IPropDTO = PropFragment & {
//   apiRef?: Maybe<Ref<IInterfaceType>>
// }

export interface IPropDTO {
  id: string
  // data: IData
  data: string
  // api?: IInterfaceTypeDTO
  api?: Ref<IInterfaceType>
}
