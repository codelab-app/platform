import { propSafeStringify } from '@codelab/shared/utils'
import { useCallback } from 'react'
import { PropsPerElementIdPayload } from '../store'
import { useBuilderDispatch } from './useBuilderDispatch'

export interface UseOnRendered {
  onRendered: (props: PropsPerElementIdPayload) => void
}

/**
 * Provides a handler that updates the lastRenderedProps in the builder state
 */
export const useOnRendered = (): UseOnRendered => {
  const { setLastRenderedPropsForElement } = useBuilderDispatch()

  const onRendered: UseOnRendered['onRendered'] = useCallback(
    ({ elementId, props }) => {
      setLastRenderedPropsForElement({
        elementId,
        props: JSON.parse(propSafeStringify(props)),
      })
    },
    [setLastRenderedPropsForElement],
  )

  return { onRendered }
}
