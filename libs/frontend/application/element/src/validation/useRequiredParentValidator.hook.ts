import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  useDomainStore,
  useStore,
} from '@codelab/frontend-application-shared-store/provider'

export const useRequiredParentValidator = () => {
  const { elementService } = useStore()
  const { atomDomainService } = useDomainStore()

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

      createFormErrorNotificationHandler({
        description: `[${childAtom.name} can only be a child of ${requiredParents}].`,
        title: 'Invalid parent',
      })()
    }

    return isValid
  }

  const validateParentForMove = (
    childElementId?: string,
    parentElementId?: string,
  ) => {
    const parentElement = elementService.element(String(parentElementId))
    const childElement = elementService.element(String(childElementId))

    return validate(childElement.renderType.id, parentElement.renderType.id)
  }

  const validateParentForCreate = (
    childAtomId?: string,
    parentElementId?: string,
  ) => {
    const parentElement = elementService.element(String(parentElementId))

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
