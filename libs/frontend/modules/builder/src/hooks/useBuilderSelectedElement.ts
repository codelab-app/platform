import {
  ElementFragment,
  useGetElementQuery,
} from '@codelab/frontend/modules/element'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { builderSelectors } from '../store'
import { useBuilderDispatch } from './useBuilderDispatch'

export interface UseBuilderSelectedElement {
  selectedElement: Nullable<ElementFragment>
  selectedElementId: Maybe<string>
  isLoading: boolean
  setSelectedElement: (elementId?: string) => void
  resetSelection: () => void
}

export const useBuilderSelectedElement = (): UseBuilderSelectedElement => {
  const selectedElementId = useSelector(builderSelectors.selectedElementId)
  const { selectElement, resetSelection } = useBuilderDispatch()

  const setSelectedElement = useCallback(
    (elementId?: string) => selectElement({ elementId }),
    [selectElement],
  )

  const state = useGetElementQuery(
    { variables: { input: { where: { id: selectedElementId } } } },
    {
      skip: !selectedElementId,
      selectFromResult: (r) => ({
        selectedElement: r.data?.getElement ?? null,
        isLoading: r.isLoading,
        selectedElementId,
      }),
    },
  )

  return {
    ...state,
    setSelectedElement,
    resetSelection,
  }
}
