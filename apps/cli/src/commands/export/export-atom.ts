import { AtomOGM, atomSelectionSet } from '@codelab/backend'
import { IAtomExport } from '@codelab/shared/abstract/core'
import * as inquirer from 'inquirer'

export type ExportAtomData = {
  atoms: Array<IAtomExport>
}

export const exportAtom = async (): Promise<ExportAtomData> => {
  const Atom = await AtomOGM()

  const atoms = await Atom.find({
    selectionSet: atomSelectionSet,
  })

  const confirmExportAtom = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Would you like to export Atoms',
    },
  ])

  if (confirmExportAtom['confirm']) {
    return { atoms }
  }

  return { atoms: [] }
}
