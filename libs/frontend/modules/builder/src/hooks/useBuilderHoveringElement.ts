import {
  ElementFragment,
  useGetElementQuery,
} from '@codelab/frontend/modules/element'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { builderActions, builderSelectors } from '../store'

export interface UseBuilderHoveringElement {
  hoveringElement: ElementFragment | null
  hoveringElementId: string | undefined
  isLoading: boolean
  setHoveringElement: (elementId?: string) => void
  resetSelection: () => void
}

export const useBuilderHoveringElement = (): UseBuilderHoveringElement => {
  const hoveringElementId = useSelector(builderSelectors.hoveringElementId)
  const dispatch = useDispatch()

  const setHoveringElement = useCallback(
    (elementId?: string) =>
      dispatch(builderActions.hoverElement({ elementId })),
    [dispatch],
  )

  const resetSelection = useCallback(
    () => dispatch(builderActions.resetSelection),
    [dispatch],
  )

  const state = useGetElementQuery(
    { variables: { input: { where: { id: hoveringElementId } } } },
    {
      skip: !hoveringElementId,
      selectFromResult: (r) => ({
        hoveringElement: r.data?.getElement ?? null,
        isLoading: r.isLoading,
        hoveringElementId,
      }),
    },
  )

  return {
    hoveringElement: hoveringElementId ? state.hoveringElement : null,
    hoveringElementId,
    isLoading: state.isLoading,
    resetSelection,
    setHoveringElement,
  }
}
