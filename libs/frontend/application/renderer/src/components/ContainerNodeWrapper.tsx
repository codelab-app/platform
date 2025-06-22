'use client'

import type { PropsWithChildren } from 'react'

import {
  type IRuntimeComponentModel,
  type IRuntimePageModel,
  isRuntimePage,
} from '@codelab/frontend-abstract-application'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

/**
 * An observer wrapper for page/component - this makes sure that container re-renders on when it is changed
 */
export const ContainerNodeWrapper = observer<
  PropsWithChildren<{
    runtimeContainerNode: IRuntimeComponentModel | IRuntimePageModel
  }>
>(({ children, runtimeContainerNode }) => {
  const containerNodeSnapshot = getSnapshot(
    isRuntimePage(runtimeContainerNode)
      ? runtimeContainerNode.page.current
      : runtimeContainerNode.component.current,
  )

  /**
   * re-render on element change
   */
  useEffect(() => {
    runtimeContainerNode.render()
  }, [containerNodeSnapshot])

  return <>{children}</>
})

ContainerNodeWrapper.displayName = 'ContainerNodeWrapper'
