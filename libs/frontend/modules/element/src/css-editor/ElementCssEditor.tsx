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
  onChange: (css: cssMap) => void
}

const FlexBoxEditor = observer(({ onChange }: FlexBoxEditorProps) => {
  // const [css, setCss] = useState('')
  const [flex, setFlex] = useState('none')

  const updateFlex = (newVal: string) => {
    if (flex !== newVal) {
      setFlex(newVal)
      onChange({
        'background-color': 'red',
        width: '100%',
        display: 'flex',
        'flex-direction': newVal,
      })

      return
    }

    setFlex('none')
    onChange({
      'background-color': 'red',
      width: '100%',
      display: 'flex',
      'flex-direction': 'none',
    })
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

    const [guiCss, setGuiCss] = useState<cssMap>(
      JSON.parse(element.guiCss || '{}'),
    )

    // Keep the css string value in a ref so we can access it when unmounting the component
    const customCssStringRef = useRef(customCssString)
    customCssStringRef.current = customCssString

    const guiCssRef = useRef(guiCss)
    guiCssRef.current = guiCss

    const updateCustomCss = useCallback(
      (newCustomCss: string) => {
        const promise = elementService.patchElement(element, {
          customCss: newCustomCss,
        })

        return trackPromise?.(promise) ?? promise
      },
      [element, elementService, trackPromise],
    )

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
      /*
       * Make sure the new string is saved when unmounting the component
       * because if the panel is closed too quickly, the autosave won't catch the latest changes
       */
      return () => {
        updateCustomCss(customCssStringRef.current).then()
      }
    }, [updateCustomCss])

    useEffect(() => {
      return () => {
        updateGuiCss(JSON.stringify(guiCssRef.current)).then()
      }
    }, [updateGuiCss])

    /*
     * Debounce autosave, otherwise it will be too quick
     * Getting a dgraph  error if this is too fast, like 500ms
     */
    const [customCssDebounced, setCustomCssDebounced] = useDebouncedState(
      1000,
      customCssString,
    )

    const [guiCssDebounced, setGuiCssDebounced] = useDebouncedState(
      1000,
      guiCss,
    )

    useEffect(() => {
      setCustomCssDebounced(customCssString)
    }, [customCssString, setCustomCssDebounced])

    useEffect(() => {
      setGuiCssDebounced(guiCss)
    }, [guiCss, setGuiCssDebounced])

    useEffect(() => {
      if (isString(customCssDebounced)) {
        updateCustomCss(customCssDebounced)
      }
    }, [customCssDebounced, updateCustomCss])

    useEffect(() => {
      if (guiCssDebounced) {
        updateGuiCss(JSON.stringify(guiCssDebounced))
      }
    }, [guiCssDebounced, updateGuiCss])

    // const updateCssProps = (newCssProps: cssMap) => {
    //   // find the css property and replace it with the new value
    //   const newProps = Object.keys(newCssProps)
    //   const updatedProps: Array<string> = []
    //   let newCssString = customCssString
    //   newProps.forEach((prop) => {
    //     // find the css property and replace it with the new value
    //     const match = newCssString
    //       .match(new RegExp(`(^|(;( |\n)*))(${prop})( )*:[^;]*;?`))?.[0]
    //       .match(new RegExp(`(${prop})( )*:[^;]*;?`))?.[0]

    //     if (match) {
    //       updatedProps.push(prop)
    //       newCssString = newCssString.replace(
    //         RegExp(match, 'g'),
    //         `${prop}: ${newCssProps[prop]};`,
    //       )
    //     }
    //   })

    //   // add new css properties
    //   newProps.forEach((prop) => {
    //     if (!updatedProps.includes(prop)) {
    //       newCssString += `\n${prop}: ${newCssProps[prop]};`
    //     }
    //   })

    //   setCustomCssString(newCssString)
    // }

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
        <FlexBoxEditor onChange={setGuiCss} />
      </>
    )
  },
)
