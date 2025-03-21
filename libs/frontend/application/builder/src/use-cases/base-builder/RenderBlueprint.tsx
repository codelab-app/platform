'use client'

import type { RefObject } from 'react'

import {
  type IRendererModel,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { Rect } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useWindowSize } from 'react-use'

import { ElementBlueprint } from './ElementBlueprint'

export const RenderBlueprint = observer<{
  renderContainerRef: RefObject<HTMLElement | null>
  renderer: IRendererModel
}>(({ renderContainerRef, renderer }) => {
  const [containerRect, setContainerRect] = useState(new Rect())
  const runtimeRootContainerNode = renderer.runtimeContainerNode
  const runtimeRootElement = runtimeRootContainerNode?.runtimeRootElement
  const { userDomainService } = useDomainStore()
  const window = useWindowSize()
  const isPreview = renderer.rendererType === RendererType.Preview

  useEffect(() => {
    if (renderContainerRef.current) {
      setContainerRect(renderContainerRef.current.getBoundingClientRect())
    }
  }, [
    renderContainerRef,
    userDomainService.preference.builderWidth,
    window.height,
    window.width,
  ])

  if (
    isServer ||
    !renderContainerRef.current ||
    !runtimeRootElement ||
    isPreview
  ) {
    return null
  }

  return createPortal(
    <div id="render-blueprint-container">
      <ElementBlueprint
        container={renderContainerRef.current}
        containerRect={containerRect}
        parentRect={containerRect}
        runtimeElement={runtimeRootElement}
      />
    </div>,
    renderContainerRef.current,
  )
})
