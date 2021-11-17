import {
  CRUDModalState,
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/view/components'
import {
  AtomBaseFragment,
  AtomFragment,
} from '../graphql/Atom.fragment.graphql.gen'

export type AtomState = CRUDModalState<AtomBaseFragment>

export type OpenDeleteAtomModalAction =
  OpenDeleteModalActionPayload<AtomFragment>

export type OpenUpdateAtomModalAction =
  OpenUpdateModalActionPayload<AtomFragment>
