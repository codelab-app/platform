import type { PointerEvent } from 'react'

import { usePreferenceService } from '@codelab/frontend-application-preference/services'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useState } from 'react'

export type ResizeHandlerSide = 'after' | 'before'

export const useBuilderResizer = (side: ResizeHandlerSide) => {
  const [pointerDown, setPointerDown] = useState<boolean>(false)
  const { userDomainService } = useDomainStore()
  const { update } = usePreferenceService()
  const preference = userDomainService.preference
  const breakpoint = preference.builderBreakpoint

  const onPointerDown = ({
    currentTarget,
    pointerId,
  }: PointerEvent<HTMLElement>) => {
    // listen to pointer move event
    currentTarget.setPointerCapture(pointerId)
    setPointerDown(true)
  }

  const onPointerMove = ({ movementX }: PointerEvent) => {
    if (!pointerDown) {
      return
    }

    // The builder is centered, so we have to move twice as fast
    // because the width changes from both sides
    const difference = side === 'after' ? movementX * 2 : -movementX * 2
    // this newWidth may be ignored if it exceed limits
    const newWidth = preference.builderWidth + difference

    const appliedWidth = Math.max(
      breakpoint.min,
      Math.min(newWidth, breakpoint.max),
    )

    preference.writeCache({ builderWidth: appliedWidth })
  }

  const onPointerUp = ({
    currentTarget,
    pointerId,
  }: PointerEvent<HTMLElement>) => {
    setPointerDown(false)
    // persist changes to database
    void update(preference)

    currentTarget.releasePointerCapture(pointerId)
  }

  return { onPointerDown, onPointerMove, onPointerUp }
}
