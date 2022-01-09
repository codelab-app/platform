import {
  ElementFragment,
  useGetElementQuery,
} from '@codelab/frontend/modules/element'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { builderSelectors } from '../store'
import { useBuilderDispatch } from './useBuilderDispatch'

export interface UseBuilderHoveringElement {
  hoveringElement: Nullable<ElementFragment>
  hoveringElementId: Maybe<string>
  isLoading: boolean
  setHoveringElement: (elementId?: string) => void
  resetSelection: () => void
}

export const useBuilderHoveringElement = (): UseBuilderHoveringElement => {
  const hoveringElementId = useSelector(builderSelectors.hoveringElementId)
  const { hoverElement, resetSelection } = useBuilderDispatch()

  const setHoveringElement = useCallback(
    (elementId?: string) => hoverElement({ elementId }),
    [hoverElement],
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
