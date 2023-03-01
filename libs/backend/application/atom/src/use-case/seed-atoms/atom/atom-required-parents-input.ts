import type { ExistingData } from '@codelab/backend/abstract/core'
import type { AtomSeedData } from './atom-seed-data.interface'

/**
 * @param atomName The atom name we want to update
 * @param newData Existing data for getting references
 */
export const createRequiredParents =
  (atomData: Pick<AtomSeedData, 'requiredParents'> | undefined) =>
  (newData: ExistingData) => {
    return (
      atomData?.requiredParents?.map((child) => {
        // Get the id of the existing atom by name
        const requiredAtomId = newData.atoms[child]?.id

        if (!requiredAtomId) {
          throw new Error('Required atom not found')
        }

        return { id: requiredAtomId }
      }) ?? []
    )
  }
