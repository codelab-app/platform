import {
  useGetElementQuery,
  useUpdateElementPropsMutation,
} from '@codelab/frontend/modules/element'
import { notify } from '@codelab/frontend/shared/utils'
import { propSafeStringify } from '@codelab/shared/utils'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { builderActions, builderSelectors } from '../store/builderState'

export const usePropsInspector = (elementId: string) => {
  const [persistedProps, setPersistedProps] = useState<string | undefined>()
  const dispatch = useDispatch()
  const [mutate, { isLoading }] = useUpdateElementPropsMutation({})

  const { element } = useGetElementQuery(
    { variables: { input: { where: { id: elementId } } } },
    { selectFromResult: (r) => ({ element: r.data?.getElement }) },
  )

  const lastRenderedProps = useSelector((s) =>
    builderSelectors.lastRenderedPropsForElement(s, elementId),
  )

  const setExtraPropsForElement = useCallback(
    (props: Record<string, any>) =>
      dispatch(builderActions.setExtraPropsForElement({ elementId, props })),
    [dispatch, elementId],
  )

  const save = async () => {
    if (!persistedProps) {
      notify({ title: 'Invalid json', type: 'warning' })

      return
    }

    try {
      await mutate({
        variables: {
          input: {
            elementId,
            props: JSON.stringify(JSON.parse(persistedProps)),
          },
        },
      })
    } catch (e) {
      notify({ title: 'Invalid json', type: 'warning' })
    }
  }

  useEffect(() => {
    if (element?.props) {
      try {
        setPersistedProps(JSON.stringify(JSON.parse(element.props), null, 4))
      } catch (e) {
        console.warn("Couldn't parse element props", element?.props)
      }
    }
  }, [element?.props])

  useEffect(() => {
    return () => {
      setExtraPropsForElement({})
    }
  }, [elementId, setExtraPropsForElement])

  const lastRenderedPropsString = propSafeStringify(lastRenderedProps ?? {})

  return {
    lastRenderedPropsString,
    save,
    isLoading,
    persistedProps,
    setPersistedProps,
    setExtraPropsForElement,
  }
}
