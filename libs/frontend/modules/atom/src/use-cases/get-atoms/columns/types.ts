import {
  IAtom,
  IAtomService,
  IAtomType,
  IInterfaceTypeRef,
  ITag,
} from '@codelab/shared/abstract/core'
import { Ref } from 'mobx-keystone'

export interface AtomLibrary {
  name: string
  color: string
}

export interface AllowedChildrenColumnProps {
  allowedChildren: Array<Ref<IAtom>>
}

export interface AtomRecord {
  id: string
  name: string
  type: IAtomType
  tags: Array<ITag>
  apiId: IInterfaceTypeRef
  library: AtomLibrary
  allowedChildren: Array<IAtom>
}

export type ActionColumnProps = {
  atomService: IAtomService
} & AtomRecordProps

export interface TagsColumnProps {
  tags: Array<Ref<ITag>>
}

/**
 * Passed as 2nd argument in table render function, shared across columns
 */
export interface AtomRecordProps {
  atom: AtomRecord
}
