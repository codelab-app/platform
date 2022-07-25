import { CaretRightOutlined } from '@ant-design/icons'
import { useDebouncedState } from '@codelab/frontend/shared/utils'
import {
  EmotionCssEditor,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import {
  cssMap,
  IElement,
  IElementService,
} from '@codelab/shared/abstract/core'
import { Col, Collapse, Row } from 'antd'
import { isString } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BackgroundEditor } from './css-background-editor/BackgroundEditor'
import { EffectsEditor } from './css-effects-editor/EffectsEditor'
import { LayoutEditor } from './css-layout-editor'
import { TypographyEditor } from './css-typography-editor/TypographyEditor'

const { Panel } = Collapse

export type ElementCssEditorInternalProps = {
  element: IElement
  trackPromises?: UseTrackLoadingPromises
  elementService: IElementService
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

    const [guiCssString, setGuiCssString] = useState(element.guiCss || '{}')
    // Keep the css string value in a ref so we can access it when unmounting the component
    const customCssStringRef = useRef(customCssString)
    customCssStringRef.current = customCssString

    const guiCssStringRef = useRef(guiCssString)
    guiCssStringRef.current = guiCssString

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
        updateGuiCss(guiCssStringRef.current).then()
      }
    }, [updateGuiCss])

    const [guiCssDebounced, setGuiCssDebounced] = useDebouncedState(
      1000,
      guiCssString,
    )

    useEffect(() => {
      setGuiCssDebounced(guiCssString)
    }, [guiCssString, setGuiCssDebounced])

    useEffect(() => {
      if (isString(guiCssDebounced)) {
        updateGuiCss(guiCssDebounced)
      }
    }, [guiCssDebounced, updateGuiCss])

    useEffect(() => {
      setGuiCssString(element.guiCss ?? '{}')
    }, [element.guiCss, setGuiCssString])

    if (!element.atom) {
      return <>Add an atom to this element to edit its CSS</>
    }

    return (
      <Row style={{ marginBottom: '10%' }}>
        <Col span={24}>
          <EmotionCssEditor
            height="100%"
            onChange={(value) => setCustomCssString(value)}
            value={customCssString}
          />
        </Col>
        <Col span={24}>
          <Collapse
            bordered={false}
            className="site-collapse-custom-collapse"
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Panel
              className="site-collapse-custom-panel"
              header="Layout"
              key="1"
            >
              <LayoutEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
            <Panel
              className="site-collapse-custom-panel"
              header="Typography"
              key="2"
            >
              <TypographyEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
            <Panel
              className="site-collapse-custom-panel"
              header="Background"
              key="3"
            >
              <BackgroundEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
            <Panel
              className="site-collapse-custom-panel"
              header="effects"
              key="4"
            >
              <EffectsEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    )
  },
)
