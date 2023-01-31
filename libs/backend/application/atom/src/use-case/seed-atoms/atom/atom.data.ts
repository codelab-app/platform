import type { ExistingData, IAtomImport } from '@codelab/backend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { getApiName } from '@codelab/shared/domain/mapper'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'
import { atomsData } from '../../../../../../shared/data/seed/src/atom/data'

/**
 * Create new seed data from atom types, we specify the data we want, the upsert resolution will happen later
 */
export const createAtomData = (data: ExistingData): Array<IAtomImport> => {
  return ObjectTyped.keys(atomsData).map((name) => {
    const atomData = atomsData[name]

    if (!atomData) {
      throw new Error(`Missing data for: ${name}`)
    }

    const atomId = data.atoms[name]?.id ?? v4()
    const atomTagId = data.tags[name]?.id ?? v4()
    const atomApiId = data.api[getApiName(name)]?.id ?? v4()

    return {
      id: atomId,
      name: name,
      icon: atomData.icon ?? null,
      type: IAtomType[name],
      // Here we specify the data we want to create, the merge resolution will take place later on
      tags: [{ id: atomTagId, name: atomData.tag }],
      api: {
        id: atomApiId,
        name: getApiName(name),
      },
      // allowedChildren: createAllowedChildren(antdAtomData[name]),
      /**
       * Hard to make this re-usable, lookup may be keyed by id or name
       * @param newData
       */
      allowedChildren: (newData: ExistingData) => {
        const newAtomData = atomsData[name]

        if (!newAtomData) {
          throw new Error(`Missing data for: ${name}`)
        }

        return (
          newAtomData.allowedChildren?.map((child) => {
            // Get the id of the existing atom by name
            const existingAtom = newData.atoms[child]

            if (!existingAtom) {
              throw new Error('Allowed atom not found')
            }

            return { id: existingAtom.id, name: existingAtom.name }
          }) ?? []
        )
      },
    }
  })
}
