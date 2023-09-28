import {
  atomRef,
  componentRef,
  elementRef,
  pageRef,
} from '@codelab/frontend/abstract/core'
import {
  IElementDTO,
  IElementParentContainerKind,
} from '@codelab/shared/abstract/core'

export const getParentContainer = (
  parentContainer: IElementDTO['parentContainer'],
) => {
  if (!parentContainer) {
    return null
  }

  switch (parentContainer.__typename) {
    case IElementParentContainerKind.Component: {
      return componentRef(parentContainer.id)
    }
    case IElementParentContainerKind.Page: {
      return pageRef(parentContainer.id)
    }

    default: {
      throw new Error('Invalid parentContainer')
    }
  }
}
