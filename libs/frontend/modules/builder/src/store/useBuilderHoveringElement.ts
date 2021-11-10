import {
  ElementFragment,
  useGetElementQuery,
} from '@codelab/frontend/modules/element'
import { useSelector } from 'react-redux'
import { builderSelectors } from './builderState'

export interface UseBuilderHoveringElement {
  hoveringElement: ElementFragment | null
  hoveringElementId: string | undefined
  isLoading: boolean
}

export const useBuilderHoveringElement = (): UseBuilderHoveringElement => {
  const hoveringElementId = useSelector(builderSelectors.hoveringElementId)

  return useGetElementQuery(
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
}
