import { IAtomExport, ITagExport } from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/data'
import { upsertAtom } from '../../repository/atom.repo'
import { upsertTag } from '../../repository/tag.repo'

interface ImportAtoms {
  atoms: Array<IAtomExport>
  userId: string
  atomWhere: BaseUniqueWhereCallback<IAtomExport>
  tagWhere: BaseUniqueWhereCallback<ITagExport>
}

export const importAtoms = async ({
  atoms = [],
  userId,
  atomWhere,
  tagWhere,
}: ImportAtoms) => {
  console.log('Importing atoms...')

  for (const atom of atoms) {
    for (const tag of atom.tags ?? []) {
      console.log(`Upserting tag: ${tag.name}`)
      await upsertTag(tag, userId, tagWhere)
    }

    console.log(`Upserting atom: ${atom.name}`)
    await upsertAtom(atom, userId, atomWhere)
  }
}
