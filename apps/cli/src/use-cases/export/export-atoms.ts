import { AtomOGM, atomSelectionSet } from '@codelab/backend/adapter/neo4j'
import { IAtomExport } from '@codelab/shared/abstract/core'

export const exportAtoms = async (): Promise<Array<IAtomExport>> => {
  const Atom = await AtomOGM()

  return (await Atom.find({
    selectionSet: atomSelectionSet,
  })) as Array<IAtomExport>
}
