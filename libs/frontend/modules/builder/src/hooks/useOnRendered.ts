import { IElement } from '@codelab/shared/abstract/core'
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
        const elementProps = (renderedElement as any)?.props.data

        const props =
          elementProps && typeof elementProps === 'object'
            ? JSON.parse(elementProps)
            : {}

        setLastRenderedPropsForElement({
          elementId: vertex.id,
          props,
        })
      })

      setLastRenderedProps(JSON.parse(propSafeStringify(propMap)))
    },
    [setLastRenderedProps],
  )

  return { onRendered }
}
