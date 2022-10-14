import { Ref } from 'mobx-keystone'
import { IInterfaceType } from '../type'
import { PropFragment } from './prop.fragment.graphql.gen'

export type IPropDTO = PropFragment & {
  apiRef?: Ref<IInterfaceType>
}
