import { AtomOGM, atomSelectionSet } from '@codelab/backend'
import { IAtomExport } from '@codelab/shared/abstract/core'

export type ExportAtomData = {
  atoms: Array<IAtomExport>
}

export const exportAtom = async (): Promise<ExportAtomData> => {
  const Atom = await AtomOGM()

  const atoms = (await Atom.find({
    selectionSet: atomSelectionSet,
  })) as Array<IAtomExport>

  // const confirmExportAtom = await inquirer.prompt([
  //   {
  //     type: 'confirm',
  //     name: 'confirm',
  //     message: 'Would you like to export Atoms',
  //   },
  // ])
  //
  // if (confirmExportAtom['confirm']) {
  //   return { atoms }
  // }

  return { atoms } as any
}
