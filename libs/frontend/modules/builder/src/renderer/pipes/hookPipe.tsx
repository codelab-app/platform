import { mergeProps } from '@codelab/shared/utils'
import React from 'react'
import { HookElementWrapper } from '../hooks/HookElementWrapper'
import { RenderPipeFactory } from '../types/RenderTypes'

/**
 * Adds in props from element.hooks
 */
export const hookPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (element.hooks?.length > 0) {
      return (
        // the key will cause the wrapper to be destroyed and re-rendered when we add/remove hooks, which will avoid react's error
        <HookElementWrapper
          elementId={element.id}
          key={`${props.key ?? element.id}-${element.hooks.length}`}
          hooks={element.hooks}
          inputProps={props}
          renderChildren={(hookProps) => {
            return next(element, context, mergeProps(props, hookProps))
          }}
        />
      )
    }

    return next(element, context, props)
  }
