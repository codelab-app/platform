import { notify } from '@codelab/frontend/shared/utils'
import { PropsData } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import { autorun } from 'mobx'
import { useCallback, useEffect, useState } from 'react'
import { BuilderService } from '../store/BuilderService'

export const usePropsInspector = (elementId: string) => {
  const [persistedProps, setPersistedProps] = useState<Maybe<string>>()
  const { setExtraPropsForElement } = useBuilderDispatch()
  // const [mutate, { isLoading }] = useUpdateElementsMutation()
  // const element = useGetElementById(elementId)

  const [persistedProps, setPersistedProps] = useState<Maybe<string>>(
    element.props?.jsonString ?? '{}',
  )

  // this is memoized by createTransformer, so we're effectively getting the last rendered output
  const renderOutput =
    builderService.builderRenderer.renderElementIntermediate(element)

  const lastRenderedProps = Array.isArray(renderOutput)
    ? mergeProps(renderOutput.map((o) => o.props))
    : renderOutput.props

  const setExtraProps = useCallback(
    (props: PropsData) =>
      builderService.builderRenderer.extraElementProps.setForElement(
        element.id,
        props,
      ),
    [builderService.builderRenderer.extraElementProps, element.id],
  )

  const save = async () => {
    if (!persistedProps) {
      notify({ title: 'Invalid json', type: 'warning' })

      return
    }

    try {
      // const createOrUpdate = element?.props ? 'update' : 'create'
      // await mutate({
      //   variables: {
      //     where: { id: elementId },
      //     update: {
      //       props: {
      //         [createOrUpdate]: {
      //           node: { data: JSON.stringify(JSON.parse(persistedProps)) },
      //         },
      //       },
      //     },
      //   },
      // }).unwrap()
    } catch (e) {
      console.error(e)
      notify({ title: 'Invalid json', type: 'warning' })
    } finally {
      setIsLoading(false)
    }
  }

  // useEffect(() => {
  //   if (element?.props) {
  //     try {
  //       setPersistedProps(
  //         JSON.stringify(JSON.parse(element?.props.data), null, 4),
  //       )
  //     } catch (e) {
  //       console.warn("Couldn't parse element props", element?.props)
  //     }
  //   }
  // }, [element?.props])

  useEffect(() => {
    return () => {
      setExtraProps({})
    }
  }, [setExtraProps])

  const lastRenderedPropsString = propSafeStringify(lastRenderedProps ?? {})

  return {
    lastRenderedPropsString,
    save,
    isLoading: false,
    persistedProps,
    setPersistedProps,
    setExtraPropsForElement: setExtraProps,
  }
}
