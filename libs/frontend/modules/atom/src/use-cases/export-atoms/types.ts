import { AtomFragment } from '../../graphql/Atom.fragment.v2.graphql.gen'
import { AtomStore } from '../../store'

export type ExportAtomsButtonProps = {
  atomStore: AtomStore
}

/**
 * Used for import export
 */
export type AtomsPayload = Array<AtomFragment>
