import {
  ElementFragment,
  useGetElementQuery,
} from '@codelab/frontend/modules/element'
import { useSelector } from 'react-redux'
import { builderSelectors } from './builderState'

export interface UseBuilderSelectedElement {
  selectedElement: ElementFragment | null
  selectedElementId: string | undefined
  isLoading: boolean
}

export const useBuilderSelectedElement = (): UseBuilderSelectedElement => {
  const selectedElementId = useSelector(builderSelectors.selectedElementId)

  return useGetElementQuery(
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
}
