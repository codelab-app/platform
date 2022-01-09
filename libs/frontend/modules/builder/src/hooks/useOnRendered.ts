import { propSafeStringify } from '@codelab/shared/utils'
import { mapValues } from 'lodash'
import { useCallback } from 'react'
import { RenderPipelinePropsByElementId } from '../store'
import { useBuilderDispatch } from './useBuilderDispatch'

export interface UseOnRendered {
  onRendered: (props: RenderPipelinePropsByElementId) => void
}

/**
 * Provides a handler that updates the lastRenderedProps in the builder state
 */
export const useOnRendered = (): UseOnRendered => {
  const { setLastRenderedProps } = useBuilderDispatch()

  const onRendered: UseOnRendered['onRendered'] = useCallback(
    (props) => {
      setLastRenderedProps(
        mapValues(props, (x) => JSON.parse(propSafeStringify(x))),
      )
    },
    [setLastRenderedProps],
  )

  return { onRendered }
}
