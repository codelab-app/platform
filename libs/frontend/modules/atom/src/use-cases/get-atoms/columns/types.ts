import { AtomType } from '@codelab/shared/abstract/core'
import { WithAtomService } from '../../../store'

export interface AtomRecord {
  id: string
  name: string
  type: AtomType
  tagIds: Array<string>
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
  tags: [object]
}
