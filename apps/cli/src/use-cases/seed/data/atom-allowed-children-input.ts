import { ExistingData } from '@codelab/shared/abstract/core'
import { AtomSeedData } from '@codelab/shared/data'

/**
 * @param atomName The atom name we want to update
 * @param newData Existing data for getting references
 * @param atomData
 */
export const createAllowedChildren =
  (atomData: Pick<AtomSeedData, 'allowedChildren'> | undefined) =>
  (newData: ExistingData) => {
    return (
      atomData?.allowedChildren?.map((child) => {
        // Get the id of the existing atom by name
        const allowedAtom = newData.atoms[child]?.id

        if (!allowedAtom) {
          throw new Error('Allowed atom not found')
        }

        return { id: allowedAtom }
      }) ?? []
    )
  }
