import { propSafeStringify } from '@codelab/shared/utils'
import { ReactNode, useCallback } from 'react'
import { RenderPipelinePropsByElementId } from '../store'
import { useBuilderDispatch } from './useBuilderDispatch'

export interface UseOnRendered {
  onRendered: (renderMap: Record<string, ReactNode>) => void
}

/**
 * Provides a handler that updates the lastRenderedProps in the builder state
 */
export const useOnRendered = (): UseOnRendered => {
  const { setLastRenderedProps } = useBuilderDispatch()

  const onRendered: UseOnRendered['onRendered'] = useCallback(
    (renderMap) => {
      const propMap: RenderPipelinePropsByElementId = {}

      Object.keys(renderMap).forEach((key) => {
        const props = (renderMap[key] as any)?.props

        if (props && typeof props === 'object') {
          propMap[key] = props
        }
      })

      setLastRenderedProps(JSON.parse(propSafeStringify(propMap)))
    },
    [setLastRenderedProps],
  )

  return { onRendered }
}
