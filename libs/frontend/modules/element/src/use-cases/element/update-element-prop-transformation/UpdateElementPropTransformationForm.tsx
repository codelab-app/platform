import { useDebouncedState } from '@codelab/frontend/shared/utils'
import { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { IElement, IElementService } from '@codelab/shared/abstract/core'
import TextArea from 'antd/lib/input/TextArea'
import { isString } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export type UpdateElementPropTransformationFormProp = {
  element: IElement
  trackPromises?: UseTrackLoadingPromises
  monacoProps?: null
  elementService: IElementService
}

const defaultFn = `// Write a transformer function, you get the input props as parameter
// All returned props will get merged with the original ones
function transform(props){
  return {
  }
}`

export const UpdateElementPropTransformationForm =
  observer<UpdateElementPropTransformationFormProp>(
    ({ element, elementService, trackPromises, monacoProps }) => {
      const { trackPromise } = trackPromises ?? {}

      const [value, setValue] = useState(
        element.propTransformationJs || defaultFn,
      )

      // Keep the value string value in a ref so we can access it when unmounting the component
      const valueRef = useRef(value)
      valueRef.current = value

      const updateValue = useCallback(
        (newValue: string) => {
          if (newValue === defaultFn) {
            return
          }

          const promise = elementService.updateElementsPropTransformationJs(
            element,
            newValue,
          )

          return trackPromise?.(promise) ?? promise
        },
        [element, elementService, trackPromise],
      )

      useEffect(() => {
        // Make sure the new string is saved when unmounting the component
        // because if the panel is closed too quickly, the autosave won't catch the latest changes
        return () => {
          updateValue(valueRef.current)
        }
      }, [updateValue])

      // Debounce autosave
      const [valueDebounced, setValueDebounced] = useDebouncedState(500, value)

      useEffect(() => {
        setValueDebounced(value)
      }, [value, setValueDebounced])

      useEffect(() => {
        if (isString(valueDebounced)) {
          updateValue(valueDebounced)
        }
      }, [valueDebounced, updateValue])

      return (
        <TextArea rows={4} />
        // containerProps={{
        //   style: { height: '100%' },
        //   ...(monacoProps?.containerProps || {}),
        // }}
        // editorOptions={{
        //   language: 'javascript',
        //   lineNumbers: 'off',
        //   ...(monacoProps?.editorOptions || {}),
        // }}
        // onChange={(v) => setValue(v || '')}
        // value={value}
        // // eslint-disable-next-line react/jsx-props-no-spreading
        // {...monacoProps}
      )
    },
  )
