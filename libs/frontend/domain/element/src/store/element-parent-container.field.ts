import type { IElementDto } from '@codelab/shared/abstract/core'

import { componentRef, pageRef } from '@codelab/frontend/abstract/domain'
import { IElementParentContainerKind } from '@codelab/shared/abstract/core'

export const getParentContainer = (
  parentContainer: IElementDto['parentContainer'],
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
