import {
  atomSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IAtomExport } from '@codelab/shared/abstract/core'

export const exportAtoms = async (): Promise<Array<IAtomExport>> => {
  const Atom = await Repository.instance.Atom

  return (await Atom.find({
    selectionSet: atomSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })) as Array<IAtomExport>
}
