import { TagFragment } from '@codelab/frontend/modules/tag'
import { AtomFragment } from '../../../graphql/Atom.fragment.graphql.gen'

export type LibraryColumnProps = {
  library: string
}

export type PropsColumnProps = {
  atom: AtomFragment
}

export type ActionColumnProps = {
  atom: AtomFragment
}

export type TagsColumnProps = {
  tags: [string]
  tagData: Array<TagFragment>
}
