import { isAtomInstance } from '@codelab/frontend/domain/atom'
import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'

export const useRequiredParentValidator = () => {
  const { atomService, elementService } = useStore()

  const validate = (childElementId?: string, parentElementId?: string) => {
    const childElement = elementService.element(String(childElementId))
    const parentElement = elementService.element(String(parentElementId))

    const parentAtom = isAtomInstance(parentElement.renderType)
      ? parentElement.renderType.maybeCurrent
      : undefined

    const childAtom = isAtomInstance(childElement.renderType)
      ? childElement.renderType.maybeCurrent
      : undefined

    if (!childAtom?.requiredParents.length) {
      return true
    }

    if (!parentAtom) {
      return false
    }

    return childAtom.requiredParents.some(
      (requiredParent) => requiredParent.id === parentAtom.id,
    )
  }

  const validateRequiredParent = (
    childElementId?: string,
    parentElementId?: string,
  ) => {
    const isValid = validate(childElementId, parentElementId)
    const childElement = elementService.element(String(childElementId))

    const childAtom = isAtomInstance(childElement.renderType)
      ? childElement.renderType.maybeCurrent
      : undefined

    if (!isValid) {
      const requiredParents = childAtom?.requiredParents
        .map((requiredParent) => requiredParent.current.name)
        .join(', ')

      createNotificationHandler({
        content: `[${childAtom?.name} can only be a child of ${requiredParents}].`,
        title: 'Invalid parent',
      })()

      return false
    }

    return true
  }

  const validateCreate = (atomId?: string, parentElementId?: string) => {
    const parentElement = elementService.element(String(parentElementId))

    const parentAtom = isAtomInstance(parentElement.renderType)
      ? parentElement.renderType.maybeCurrent
      : undefined

    const childAtom = atomService.atomsList.find((atom) => atom.id === atomId)

    if (!childAtom?.requiredParents.length) {
      return true
    }

    const isValid = childAtom.requiredParents.some(
      (requiredParent) => requiredParent.id === parentAtom?.id,
    )

    if (!parentAtom || !isValid) {
      const requiredParents = childAtom.requiredParents
        .map((requiredParent) => requiredParent.current.name)
        .join(', ')

      createNotificationHandler({
        content: `[${childAtom.name} can only be a child of ${requiredParents}].`,
        title: 'Invalid parent',
      })()

      return false
    }

    return true
  }

  return {
    validateCreate,
    validateRequiredParent,
  }
}
