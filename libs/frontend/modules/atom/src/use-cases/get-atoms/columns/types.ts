import {
  IAtomService,
  IAtomType,
  IInterfaceTypeRef,
  ITag,
} from '@codelab/shared/abstract/core'
import { Ref } from 'mobx-keystone'

export interface AtomRecord {
  id: string
  name: string
  type: IAtomType
  tags: Array<ITag>
  apiId: IInterfaceTypeRef
}

export type LibraryColumnProps = {
  library: string
}

export type PropsColumnProps = {
  atom: AtomRecord
}

export type ActionColumnProps = {
  atom: AtomRecord
  atomService: IAtomService
}

export type TagsColumnProps = {
  tags: Array<Ref<ITag>>
}
