import { ELEMENT_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useDebouncedState } from '@codelab/frontend/shared/utils'
import {
  EmotionCssEditor,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { IElement } from '@codelab/shared/abstract/core'
import { Radio } from 'antd'
import { isString } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export type ElementCssEditorInternalProps = WithServices<ELEMENT_SERVICE> & {
  element: IElement
  trackPromises?: UseTrackLoadingPromises
}

type cssMap = { [prop: string]: string }

type FlexBoxEditorProps = {
  element: IElement
}

/*

  TODO:
  - Setup the guiCss here so that element is patched whenever guiCss has changed - DONE
  - in any component, use appendToGuiCss to add css to the guiCss - DONE
  - in any component, use deleteFromGuiCss to remove css from the guiCss - DONE

  // Next steps: 
  - Design the UI -> must be pretty using icons etc.
  - implement the UI for Layout Editor
  

  // Also do:
  - define the interfaces for what Css changes are possible? basically what potential values
    can guiCss be set to?
  */

const FlexBoxEditor = observer(({ element }: FlexBoxEditorProps) => {
  const [css, setCss] = useState<cssMap>({})
  const [flex, setFlex] = useState('none')

  const updateFlex = (newVal: string) => {
    if (flex !== newVal) {
      setFlex(newVal)
      element.appendToGuiCss({
        'background-color': 'red',
        width: '100%',
        display: 'flex',
        'flex-direction': newVal,
      })

      return
    }

    setFlex('none')
    element.deleteFromGuiCss(['flex-direction', 'display'])
  }

  return (
    <Radio.Group defaultValue="none" size="small" value={flex}>
      <Radio.Button onClick={() => updateFlex('row')} value="row">
        row
      </Radio.Button>
      <Radio.Button
        onClick={() => updateFlex('row-reverse')}
        value="row-reverse"
      >
        row-reverse
      </Radio.Button>
      <Radio.Button onClick={() => updateFlex('column')} value="column">
        column
      </Radio.Button>
      <Radio.Button
        onClick={() => updateFlex('column-reverse')}
        value="column-reverse"
      >
        column-reverse
      </Radio.Button>
    </Radio.Group>
  )
})

export const ElementCssEditor = observer(
  ({
    element,
    trackPromises,
    elementService,
  }: ElementCssEditorInternalProps) => {
    const { trackPromise } = trackPromises ?? {}

    const [customCssString, setCustomCssString] = useState(
      element.customCss || '',
    )

    // Keep the css string value in a ref so we can access it when unmounting the component
    const customCssStringRef = useRef(customCssString)
    customCssStringRef.current = customCssString

    const updateCustomCss = useCallback(
      (newCustomCss: string) => {
        const promise = elementService.patchElement(element, {
          customCss: newCustomCss,
        })

        return trackPromise?.(promise) ?? promise
      },
      [element, elementService, trackPromise],
    )

    useEffect(() => {
      /*
       * Make sure the new string is saved when unmounting the component
       * because if the panel is closed too quickly, the autosave won't catch the latest changes
       */
      return () => {
        updateCustomCss(customCssStringRef.current).then()
      }
    }, [updateCustomCss])

    /*
     * Debounce autosave, otherwise it will be too quick
     * Getting a dgraph  error if this is too fast, like 500ms
     */
    const [customCssDebounced, setCustomCssDebounced] = useDebouncedState(
      1000,
      customCssString,
    )

    useEffect(() => {
      setCustomCssDebounced(customCssString)
    }, [customCssString, setCustomCssDebounced])

    useEffect(() => {
      if (isString(customCssDebounced)) {
        updateCustomCss(customCssDebounced)
      }
    }, [customCssDebounced, updateCustomCss])

    if (!element.atom) {
      return <>Add an atom to this element to edit its CSS</>
    }

    return (
      <>
        <EmotionCssEditor
          height="100%"
          onChange={(value) => setCustomCssString(value)}
          value={customCssString}
        />
        <FlexBoxEditor element={element} />
      </>
    )
  },
)
