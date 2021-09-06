import { useGetElementLazyQuery } from '@codelab/frontend/modules/element'
import { IElementVertex } from '@codelab/shared/abstract/core'
import { useEffect } from 'react'

export const useFetchElement = (
  element: IElementVertex | undefined,
  setElement: (element?: IElementVertex) => any,
) => {
  // Doing this makes sure the selected/hovering element objects are updated whenever we mutate the actual element and refetch
  // it should be cached, so this shouldn't cause another api call

  const [fetchElement, { data: fetchedElement, loading }] =
    useGetElementLazyQuery({ fetchPolicy: 'cache-first' })

  useEffect(() => {
    if (element) {
      fetchElement({
        variables: { input: { elementId: element?.id } },
      })
    }
  }, [fetchElement, element])

  useEffect(() => {
    if (
      element &&
      fetchedElement &&
      fetchedElement.getElement &&
      element.id === fetchedElement.getElement?.id &&
      element !== fetchedElement &&
      !loading
    ) {
      setElement(fetchedElement.getElement)
    }
  }, [element, fetchedElement, loading, setElement])
}
