import {
  IElement,
  isAdmin,
  IUser,
  TagSchema,
} from '@codelab/shared/abstract/core'
import { defaultElementName } from './defaultElementName'

/**
 * Sets the componentTag of the element with the provided name or a default one.
 * Sets the owner of the tag to the current user, unless it's an admin
 */
export const attachComponentTag = (
  element: IElement,
  currentUser: IUser | undefined,
  componentName?: string,
): void => {
  if (element.componentTag) {
    return
  }

  if (element.instanceOfComponent) {
    throw new Error(
      `Element with id ${element.id} is a component instance, can't turn it into a component`,
    )
  }

  const name = componentName || defaultElementName(element) || 'My component'

  element.componentTag = TagSchema.parse({
    name: name,
    children: [],
    isRoot: true,
    owner:
      !currentUser || isAdmin(currentUser) ? null : { id: currentUser?.id },
  })
}
