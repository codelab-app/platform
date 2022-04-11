import { AtomType, ITag } from '@codelab/shared/abstract/core'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Tag } from 'libs/frontend/modules/tag/src/store/tag.model'
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
  tags: Array<Tag>
}
