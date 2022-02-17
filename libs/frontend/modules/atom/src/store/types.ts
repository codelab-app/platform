import {
  CRUDModalState,
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/abstract/core'
import { AtomFragment } from '../graphql/Atom.fragment.v2.graphql.gen'

export type AtomState = CRUDModalState<AtomFragment> & {
  selectedIds: Array<string>
}

export type OpenDeleteAtomModalAction =
  OpenDeleteModalActionPayload<AtomFragment>

export type OpenUpdateAtomModalAction =
  OpenUpdateModalActionPayload<AtomFragment>

export type SetSelectedAtomIdsModalAction = {
  selectedIds: Array<string>
}
