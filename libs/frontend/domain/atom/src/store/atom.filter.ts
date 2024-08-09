import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { AtomType } from '@codelab/shared/infra/gql'
import type { IAtomDto } from '@codelab/shared/abstract/core'

export const filterAtoms = (
  allAtoms: Array<
    | IAtomModel
    | {
        id: string
        name: string
        requiredParents: Array<{ id: string; type: AtomType }>
      }
  >,
  parent: IAtomModel,
) => {
  const atomsRequiringCurrentParent = allAtoms.filter((atom) => {
    return atom.requiredParents.length
      ? atom.requiredParents.some(
          (requiredParent) => requiredParent.id === parent.id,
        )
      : false
  })

  const atomsExcludingSelfAndRequiredParents = allAtoms.filter((atom) => {
    return parent.requiredParents.length
      ? parent.requiredParents.every(
          (requiredParent) => requiredParent.id !== atom.id,
        ) && parent.id !== atom.id
      : false
  })

  const atomsWithNoRequiredParents = allAtoms.filter(
    (atom) => atom.requiredParents.length === 0,
  )

  if (atomsRequiringCurrentParent.length) {
    // only get atoms if their required parents include the parent
    return atomsRequiringCurrentParent
  }

  if (atomsExcludingSelfAndRequiredParents.length) {
    // only get atoms if the required parents of the parent doesn't include the atom
    return atomsExcludingSelfAndRequiredParents
  }

  // only get atoms that doesn't have required parents
  return atomsWithNoRequiredParents
}

export const mapAtomOptions = (
  atom:
    | IAtomDto
    | {
        id: string
        name: string
        requiredParents: Array<{ id: string; type: AtomType }>
      },
): SelectOption => ({ label: atom.name, value: atom.id })
