import { AtomFragment } from '../../graphql/Atom.fragment.v2.graphql.gen'

export type ExportAtomsButtonProps = {
  atomIds: Array<string>
}

/**
 * Used for import export
 */
export type AtomsPayload = Array<AtomFragment>
