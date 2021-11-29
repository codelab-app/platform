import { IElement } from '@codelab/shared/abstract/core'
import { propSafeStringify } from '@codelab/shared/utils'
import { ReactNode, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { builderActions } from '../store/builderState'

export interface UseOnRendered {
  onRendered: (renderedElement: ReactNode, vertex: IElement) => void
}

/**
 * Provides a handler that updates the lastRenderedProps in the builder state
 */
export const useOnRendered = (): UseOnRendered => {
  const dispatch = useDispatch()

  const onRendered: UseOnRendered['onRendered'] = useCallback(
    (renderedElement, vertex) => {
      setTimeout(() => {
        const props = (renderedElement as any)?.props

        if (props && typeof props === 'object') {
          dispatch(
            builderActions.setLastRenderedPropsForElement({
              elementId: vertex.id,
              props: JSON.parse(propSafeStringify(props)),
            }),
          )
        } else {
          dispatch(
            builderActions.setLastRenderedPropsForElement({
              elementId: vertex.id,
              props: {},
            }),
          )
        }
      })
    },
    [dispatch],
  )

  return { onRendered }
}
