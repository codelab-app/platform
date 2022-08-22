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

export interface AtomRecord {
  id: string
  name: string
  type: IAtomType
  tags: Array<ITag>
  apiId: IInterfaceTypeRef
  library: AtomLibrary
}

export type LibraryColumnProps = {
  library: AtomLibrary
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
