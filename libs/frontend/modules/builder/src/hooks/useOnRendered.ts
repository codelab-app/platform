import { IElement } from '@codelab/shared/abstract/core'
import { propSafeStringify } from '@codelab/shared/utils'
import { ReactNode, useCallback } from 'react'
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
    (renderedElement, vertex) => {
      setTimeout(() => {
        const props = (renderedElement as any)?.props

        if (props && typeof props === 'object') {
          setLastRenderedPropsForElement({
            elementId: vertex.id,
            props: JSON.parse(propSafeStringify(props)),
          })
        } else {
          setLastRenderedPropsForElement({
            elementId: vertex.id,
            props: {},
          })
        }
      })

      setLastRenderedProps(JSON.parse(propSafeStringify(propMap)))
    },
    [setLastRenderedProps],
  )

  return { onRendered }
}
