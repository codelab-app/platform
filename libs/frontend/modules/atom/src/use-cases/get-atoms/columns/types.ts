import { AtomType } from '@codelab/shared/abstract/core'
import { AtomStore } from '../../../store'

export interface AtomCellData {
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
  atom: AtomCellData
}

export type ActionColumnProps = {
  atom: AtomCellData
  atomStore: AtomStore
}

export type TagsColumnProps = {
  tags: [object]
}
