import {
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
  allowedChildren: any
}

export interface AtomRecord {
  id: string
  name: string
  type: IAtomType
  tags: Array<ITag>
  apiId: IInterfaceTypeRef
  library: AtomLibrary
}

export interface LibraryColumnProps {
  library: AtomLibrary
}

export interface PropsColumnProps {
  atom: AtomRecord
}

export interface ActionColumnProps {
  atom: AtomRecord
  atomService: IAtomService
}

export interface TagsColumnProps {
  tags: Array<Ref<ITag>>
}
