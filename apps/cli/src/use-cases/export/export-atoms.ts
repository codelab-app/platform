import type { IAtomExport } from '@codelab/backend/abstract/core'
import {
  atomSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export const exportAtoms = async (): Promise<Array<IAtomExport>> => {
  const Atom = await Repository.instance.Atom

  return (await Atom.find({
    selectionSet: atomSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })) as Array<IAtomExport>
}
