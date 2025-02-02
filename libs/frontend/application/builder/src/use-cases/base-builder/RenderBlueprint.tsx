'use client'

import type { RefObject } from 'react'

import { type IRendererModel } from '@codelab/frontend/abstract/application'
import { Rect } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useWindowSize } from 'react-use'

import { ElementBlueprint } from './ElementBlueprint'

export const RenderBlueprint = observer<{
  builderContainerRef: RefObject<HTMLElement | null>
  renderContainerRef: RefObject<HTMLElement | null>
  renderer: IRendererModel
}>(({ builderContainerRef, renderContainerRef, renderer }) => {
  const [containerRect, setContainerRect] = useState(new Rect())
  const runtimeRootContainerNode = renderer.runtimeContainerNode
  const runtimeRootElement = runtimeRootContainerNode?.runtimeRootElement
  const { userDomainService } = useDomainStore()
  const window = useWindowSize()

  useEffect(() => {
    if (renderContainerRef.current) {
      setContainerRect(renderContainerRef.current.getBoundingClientRect())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDomainService.preference.builderWidth, window.height, window.width])

  if (
    isServer ||
    !renderContainerRef.current ||
    !runtimeRootElement ||
    !builderContainerRef.current
  ) {
    return null
  }

  return createPortal(
    <div id="render-blueprint-container">
      <ElementBlueprint
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        container={renderContainerRef.current!}
        containerRect={containerRect}
        key={runtimeRootElement.compositeKey}
        parentRect={renderContainerRef.current.getBoundingClientRect()}
        runtimeElement={runtimeRootElement}
      />
    </div>,
    builderContainerRef.current,
  )
})
