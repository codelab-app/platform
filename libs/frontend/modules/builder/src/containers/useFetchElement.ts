import { IElement } from '@codelab/frontend/abstract/core'
import { useLazyGetElementQuery } from '@codelab/frontend/modules/element'
import { useEffect } from 'react'

export const useFetchElement = (
  element: IElement | undefined,
  setElement: (element?: IElement) => any,
) => {
  // Doing this makes sure the selected/hovering element objects are updated whenever we mutate the actual element and refetch
  // it should be cached, so this shouldn't cause another api call

  // TODO fix this
  const [fetchElement, { data: fetchedElement, isLoading }] =
    useLazyGetElementQuery({})

  // useEffect(() => {
  //   if (element) {
  //     fetchElement({
  //       variables: { input: { where: { id: element?.id } } },
  //     })
  //   }
  // }, [fetchElement, element])

  useEffect(() => {
    if (
      element &&
      fetchedElement &&
      fetchedElement.getElement &&
      element.id === fetchedElement.getElement?.id &&
      element !== fetchedElement &&
      !isLoading
    ) {
      setElement(fetchedElement?.getElement as IElement)
    }
  }, [element, fetchedElement, isLoading, setElement])
}
