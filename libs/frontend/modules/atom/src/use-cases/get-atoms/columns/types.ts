import { Tag } from '@codelab/frontend/modules/tag'
import { AtomType, ITag } from '@codelab/shared/abstract/core'
import { Ref } from 'mobx-keystone'
import { WithAtomService } from '../../../store'

export interface AtomRecord {
  id: string
  name: string
  type: AtomType
  tags: Array<ITag>
  apiId: string
}

export type LibraryColumnProps = {
  library: string
}

export type PropsColumnProps = {
  atom: AtomRecord
}

export type ActionColumnProps = {
  atom: AtomRecord
} & WithAtomService

export type TagsColumnProps = {
  tags: Array<Ref<Tag>>
}
