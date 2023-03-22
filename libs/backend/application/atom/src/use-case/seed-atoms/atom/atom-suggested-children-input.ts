import type { ExistingData } from '@codelab/backend/abstract/core'
import type { AtomSeedData } from './atom-seed-data.interface'

/**
 * @param atomName The atom name we want to update
 * @param newData Existing data for getting references
 * @param atomData
 */
export const createSuggestedChildren =
  (atomData: Pick<AtomSeedData, 'suggestedChildren'> | undefined) =>
  (newData: ExistingData) => {
    return (
      atomData?.suggestedChildren?.map((child) => {
        // Get the id of the existing atom by name
        const allowedAtom = newData.atoms[child]?.id

        if (!allowedAtom) {
          throw new Error('Allowed atom not found')
        }

        return { id: allowedAtom }
      }) ?? []
    )
  }
