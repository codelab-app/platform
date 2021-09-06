import { HookFragment } from '@codelab/frontend/modules/element'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { useHookFactory } from './useHookFactory'

export interface HookElementWrapperProps {
  hooks: Array<HookFragment>
  onRendered?: (renderedElement: React.ReactElement) => void
}

/**
 * Wrapper for a rendered element that uses hooks
 * Required, because we can't use hooks in renderFactory since it's a plain function, not a React component
 */
export const HookElementWrapper = ({
  hooks,
  children,
  onRendered,
}: React.PropsWithChildren<HookElementWrapperProps>) => {
  const hookProps = useHookFactory(hooks)
  const [key, setKey] = useState(v4())

  // Change the element key every time the number of hooks change, that way we avoid getting a error from react
  // reason is - the element will be destroyed and rerendered
  useEffect(() => {
    setKey(v4())
  }, [hooks.length])

  if (!children) {
    return null
  }

  const child = React.Children.only(children)

  if (
    !child ||
    typeof child === 'string' ||
    typeof child === 'boolean' ||
    typeof child === 'number'
  ) {
    return null
  }

  const childProps = {
    ...(hookProps || {}),
    key,
  }

  const rendered = React.cloneElement(child as any, childProps)

  if (onRendered) {
    onRendered(rendered)
  }

  return rendered
}

HookElementWrapper.displayName = 'HookElementWrapper'
HookElementWrapper.whyDidYouRender = true
