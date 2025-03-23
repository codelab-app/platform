import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { IAtomDto, IComponentDto } from '@codelab/shared/abstract/core'
import type { AtomType } from '@codelab/shared/infra/gqlgen'

export const filterAtoms = (
  allAtoms: Array<
    | IAtomDto
    | {
        id: string
        name: string
        requiredParents: Array<{ id: string; type: AtomType }>
      }
  >,
  parent: IAtomModel,
) => {
  const atomsRequiringCurrentParent = allAtoms.filter((atom) => {
    return atom.requiredParents?.length
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
    (atom) => atom.requiredParents?.length === 0,
  )

  if (atomsRequiringCurrentParent.length) {
    // If there are atoms that require the current parent - return them on top,
    // as they are most likely the ones to be used.
    // Then return all the atoms the do not require any parent.
    // For example, antd Card.Grid or Card.Meta components are only allowed inside Card component,
    // but the Card component can actually contain any other children atoms as well.
    return [...atomsRequiringCurrentParent, ...atomsWithNoRequiredParents]
  }

  if (atomsExcludingSelfAndRequiredParents.length) {
    // only get atoms if the required parents of the parent doesn't include the atom
    return atomsExcludingSelfAndRequiredParents
  }

  // only get atoms that doesn't have required parents
  return atomsWithNoRequiredParents
}

export const mapEntitySelectOptions = (
  entity:
    | IAtomDto
    | IComponentDto
    | {
        id: string
        name: string
      },
): SelectOption => ({ label: entity.name, value: entity.id })
