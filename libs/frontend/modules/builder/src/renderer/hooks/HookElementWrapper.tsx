import { HookFragment } from '@codelab/frontend/modules/element'
import React from 'react'
import { useHookFactory } from './useHookFactory'

export interface HookElementWrapperProps {
  children?: never
  hooks: Array<HookFragment>
  renderChildren: (hookProps: Record<string, any>) => React.ReactNode
}

/**
 * Wrapper for a rendered element that uses hooks
 * It's needed, because we can't use hooks in renderFactory since it's a plain function, not a React component
 * Don't pass any children, instead use the renderChild render prop
 * It receives the hookProps and should return the children that will get rendered inside this component
 */
export const HookElementWrapper = ({
  hooks,
  renderChildren,
}: HookElementWrapperProps) => {
  const hookProps = useHookFactory(hooks)

  if (!renderChildren) {
    return null
  }

  // Needs to be wrapped in fragment or TS complains
  return (
    <>
      {renderChildren({
        ...(hookProps || {}),
        // The key makes sure the child gets re-rendered if the hooks change. Not sure if needed, since we do the same for the wrapper
        key: hooks.length,
      })}
    </>
  )
}

HookElementWrapper.displayName = 'HookElementWrapper'
