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
        const suggestedAtomId = newData.atoms[child]?.id

        if (!suggestedAtomId) {
          throw new Error('Suggested atom not found')
        }

        return { id: suggestedAtomId }
      }) ?? []
    )
  }
