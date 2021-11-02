import { IElement } from '@codelab/frontend/abstract/core'
import { useDebouncedState } from '@codelab/frontend/shared/utils'
import {
  MonacoEditor,
  MonacoEditorProps,
  usePromisesLoadingIndicator,
} from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { refetchGetElementQuery, useGetElementQuery } from '../get-element'
import { useUpdateElementMutation } from '../update-element/UpdateElement.web.graphql.gen'

interface InternalProps {
  tree: ElementTree
  element: IElement
  loadingStateKey: string
  monacoProps?: Omit<MonacoEditorProps, 'value' | 'onChange'>
}

const defaultFn = `// Write a transformer function, you get the input props as parameter
// All returned props will get merged with the original ones
function transform(props){
  return {
  }
}`

const InternalForm = ({
  element,
  tree,
  loadingStateKey,
  monacoProps,
}: InternalProps) => {
  const { trackPromise } = usePromisesLoadingIndicator(loadingStateKey)

  const [mutate] = useUpdateElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      refetchGetElementQuery({
        input: { where: { id: element.id } },
      }),
    ],
  })

  const [value, setValue] = useState(element.propTransformationJs || defaultFn)
  // Keep the value string value in a ref so we can access it when unmounting the component
  const valueRef = useRef(value)
  valueRef.current = value

  // const componentId = tree.getComponentOfElement(element.id)?.id
  const componentId = element.id

  const updateValue = useCallback(
    (newValue: string) => {
      if (newValue === defaultFn) {
        return
      }

      return trackPromise(
        mutate({
          variables: {
            input: {
              id: element.id,
              data: {
                atomId: element.atom?.id,
                name: element.name,
                renderIfPropKey: element.renderIfPropKey,
                propTransformationJs: newValue,
                css: element.css,
                renderForEachPropKey: element.renderForEachPropKey,
              },
            },
          },
        }),
      )
    },
    [element, mutate, trackPromise],
  )

  useEffect(() => {
    // Make sure the new string is saved when unmounting the component
    // because if the panel is closed too quickly, the autosave won't catch the latest changes
    return () => {
      updateValue(valueRef.current)
    }
  }, [updateValue])

  // Debounce the autosaving, otherwise it will be too quick
  // Getting a dgraph  error if this is too fast, like 500ms
  const [valueDebounced, setValueDebounced] = useDebouncedState(1000, value)

  useEffect(() => {
    setValueDebounced(value)
  }, [value, setValueDebounced])

  useEffect(() => {
    if (typeof valueDebounced === 'string') {
      updateValue(valueDebounced)
    }
  }, [valueDebounced, updateValue])

  return (
    <MonacoEditor
      editorOptions={{
        language: 'javascript',
        lineNumbers: 'off',
        ...(monacoProps?.editorOptions || {}),
      }}
      containerProps={{
        style: { height: '100%' },
        ...(monacoProps?.containerProps || {}),
      }}
      value={value}
      onChange={(v) => setValue(v || '')}
      {...monacoProps}
    />
  )
}

export type UpdateElementPropTransformationFormProp = Omit<
  InternalProps,
  'element'
> & {
  elementId: string
}

export const UpdateElementPropTransformationForm = ({
  elementId,
  loadingStateKey,
  monacoProps,
  tree,
}: UpdateElementPropTransformationFormProp) => {
  const { data } = useGetElementQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { where: { id: elementId } } },
  })

  const element = data?.getElement

  if (!element) {
    return null
  }

  return (
    <InternalForm
      element={element}
      loadingStateKey={loadingStateKey}
      monacoProps={monacoProps}
      tree={tree}
    />
  )
}
