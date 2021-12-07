import { IElement } from '@codelab/shared/abstract/core'
import { propSafeStringify } from '@codelab/shared/utils'
import { ReactNode, useCallback } from 'react'
import { useBuilderDispatch } from './useBuilderDispatch'

export interface UseOnRendered {
  onRendered: (renderedElement: ReactNode, vertex: IElement) => void
}

/**
 * Provides a handler that updates the lastRenderedProps in the builder state
 */
export const useOnRendered = (): UseOnRendered => {
  const { setLastRenderedPropsForElement } = useBuilderDispatch()

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
    },
    [setLastRenderedPropsForElement],
  )

  return { onRendered }
}
