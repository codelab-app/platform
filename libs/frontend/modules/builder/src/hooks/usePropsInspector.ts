import {
  useGetElementQuery,
  useUpdateElementPropsMutation,
} from '@codelab/frontend/modules/element'
import { notify } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import { propSafeStringify } from '@codelab/shared/utils'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { builderSelectors } from '../store/builderState'
import { useBuilderDispatch } from './useBuilderDispatch'

export const usePropsInspector = (elementId: string) => {
  const [persistedProps, setPersistedProps] = useState<Maybe<string>>()
  const { setExtraPropsForElement } = useBuilderDispatch()
  const [mutate, { isLoading }] = useUpdateElementPropsMutation({})

  const { element } = useGetElementQuery(
    { variables: { input: { where: { id: elementId } } } },
    { selectFromResult: (r) => ({ element: r.data?.getElement }) },
  )

  const lastRenderedProps = useSelector((s) =>
    builderSelectors.lastRenderedPropsForElement(s, elementId),
  )

  const setExtraProps = useCallback(
    (props: Record<string, any>) =>
      setExtraPropsForElement({ elementId, props }),
    [setExtraPropsForElement, elementId],
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
            data: JSON.stringify(JSON.parse(persistedProps)),
          },
        },
      }).unwrap()
    } catch (e) {
      notify({ title: 'Invalid json', type: 'warning' })
    }
  }

  useEffect(() => {
    if (element?.props) {
      try {
        setPersistedProps(
          JSON.stringify(JSON.parse(element?.props.data), null, 4),
        )
      } catch (e) {
        console.warn("Couldn't parse element props", element?.props)
      }
    }
  }, [element?.props])

  useEffect(() => {
    return () => {
      setExtraProps({})
    }
  }, [elementId, setExtraProps])

  const lastRenderedPropsString = propSafeStringify(lastRenderedProps ?? {})

  return {
    lastRenderedPropsString,
    save,
    isLoading,
    persistedProps,
    setPersistedProps,
    setExtraPropsForElement: setExtraProps,
  }
}
