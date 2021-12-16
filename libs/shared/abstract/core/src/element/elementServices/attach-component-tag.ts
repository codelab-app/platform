import { TagSchema } from '../../tag'
import { isAdmin, IUser } from '../../user'
import { IElement } from '../element.interface'
import { defaultElementName } from './defaultElementName'

/** TODO move to element module */
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
