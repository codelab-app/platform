import type { IElementModel } from '@codelab/frontend-abstract-domain'
import type { HierarchicalCollision } from '@codelab/frontend-application-dnd/collision-detection'
import type { CSSProperties } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { useDndContext } from '@dnd-kit/core'

export const DROP_INDICATOR_STYLE = '5px solid #439A56'

const afterStyle: CSSProperties = {
  borderLeft: DROP_INDICATOR_STYLE,
  borderTop: DROP_INDICATOR_STYLE,
  boxSizing: 'border-box',
}

const beforeStyle: CSSProperties = {
  borderBottom: DROP_INDICATOR_STYLE,
  borderRight: DROP_INDICATOR_STYLE,
  boxSizing: 'border-box',
}

export const useDropIndicator = (element: IElementModel) => {
  const { active, collisions } = useDndContext()
  const { elementDomainService } = useDomainStore()
  const collision = collisions?.[0] as HierarchicalCollision | undefined
  const after = collision?.data.childDroppableAfterPointer
  const before = collision?.data.childDroppableBeforePointer
  const isAfter = after === element.id
  const isBefore = before === element.id

  const activeElement = active?.id
    ? elementDomainService.element(String(active.id))
    : null

  const sameBefore =
    activeElement?.prevSibling?.id && activeElement.prevSibling.id === before

  const sameAfter =
    activeElement?.nextSibling?.id && activeElement.nextSibling.id === after

  const sameOrder = sameBefore || sameAfter

  if (sameOrder || (!isAfter && !isBefore)) {
    return null
  }

  return isAfter ? afterStyle : beforeStyle
}
