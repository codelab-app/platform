import { ELEMENT_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useDebouncedState } from '@codelab/frontend/shared/utils'
import {
  EmotionCssEditor,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { Divider } from 'antd'
import { isString } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlexBoxEditor, MarginsEditor } from './css-layout-editor'

export type ElementCssEditorInternalProps = WithServices<ELEMENT_SERVICE> & {
  element: IElement
  trackPromises?: UseTrackLoadingPromises
}

/*

  TODO: later
  - define the interfaces for what Css changes are possible? basically what potential values
    can guiCss be set to?
  */

export const ElementCssEditor = observer(
  ({
    element,
    trackPromises,
    elementService,
  }: ElementCssEditorInternalProps) => {
    const { trackPromise } = trackPromises ?? {}

    const [guiCssObj, setGuiCssObj] = useState<cssMap>(
      JSON.parse(element.guiCss ?? '{}'),
    )

    useEffect(() => {
      setGuiCssObj(JSON.parse(element.guiCss ?? '{}'))
    }, [element.guiCss])

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

    // TODO: Probably need to debounce this??
    const updateGuiCss = useCallback(
      (newGuiCss: string) => {
        const promise = elementService.patchElement(element, {
          guiCss: newGuiCss,
        })

        return trackPromise?.(promise) ?? promise
      },
      [element, elementService, trackPromise],
    )

    useEffect(() => {
      updateGuiCss(element.guiCss ?? '{}').then()
    }, [element.guiCss, updateGuiCss])

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
        <Divider orientation="left" plain>
          FlexBox
        </Divider>
        <FlexBoxEditor element={element} guiCssObj={guiCssObj} />
        <Divider orientation="left" plain>
          Margins
        </Divider>
        <MarginsEditor element={element} guiCssObj={guiCssObj} />
      </>
    )
  },
)
