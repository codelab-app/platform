import { useNotify } from '@codelab/frontend-infra-context'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { NotificationType } from '@codelab/shared-abstract-types'

export const useRequiredParentValidator = () => {
  const { atomDomainService, elementDomainService } = useDomainStore()
  const onError = useNotify(NotificationType.ERROR)

  const validate = (childAtomId?: string, parentAtomId?: string) => {
    const parentAtom = atomDomainService.atomsList.find(
      (atom) => atom.id === parentAtomId,
    )

    const childAtom = atomDomainService.atomsList.find(
      (atom) => atom.id === childAtomId,
    )

    if (!childAtom?.requiredParents.length) {
      return true
    }

    if (!parentAtom) {
      return false
    }

    const isValid = childAtom.requiredParents.some(
      (requiredParent) => requiredParent.id === parentAtom.id,
    )

    if (!isValid) {
      const requiredParents = childAtom.requiredParents
        .map((requiredParent) => requiredParent.current.name)
        .join(', ')

      onError({
        description: `[${childAtom.name} can only be a child of ${requiredParents}].`,
        title: 'Invalid parent',
      })
    }

    return isValid
  }

  const validateParentForMove = (
    childElementId?: string,
    parentElementId?: string,
  ) => {
    const parentElement = elementDomainService.element(String(parentElementId))
    const childElement = elementDomainService.element(String(childElementId))

    return validate(childElement.renderType.id, parentElement.renderType.id)
  }

  const validateParentForCreate = (
    childAtomId?: string,
    parentElementId?: string,
  ) => {
    const parentElement = elementDomainService.element(String(parentElementId))

    if (!childAtomId) {
      return true
    }

    return validate(childAtomId, parentElement.renderType.id)
  }

  return {
    validateParentForCreate,
    validateParentForMove,
  }
}
