import { componentRef, pageRef } from '@codelab/frontend/abstract/domain'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { IElementParentContainerKind } from '@codelab/shared/abstract/core'

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
