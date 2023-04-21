import { CaretRightOutlined } from '@ant-design/icons'
import type {
  CssMap,
  IElement,
  IElementService,
} from '@codelab/frontend/abstract/core'
import { CodeMirrorEditor } from '@codelab/frontend/presentation/view'
import { useDebouncedState } from '@codelab/frontend/shared/utils'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { Col, Collapse, Row } from 'antd'
import isString from 'lodash/isString'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getElementModel } from '../utils/getElementModel'
import { BackgroundEditor } from './css-background-editor/BackgroundEditor'
import { BordersEditor } from './css-borders-editor/BordersEditor'
import { EffectsEditor } from './css-effects-editor/EffectsEditor'
import { LayoutEditor } from './css-layout-editor'
import { ShadowsEditor } from './css-shadows-editor'

const { Panel } = Collapse

export interface ElementCssEditorInternalProps {
  element: IElement
  elementService: IElementService
}

/*
  TODO: later
  - define the interfaces for what Css changes are possible? basically what potential values
    can guiCss be set to?
  */

export const ElementCssEditor = observer<ElementCssEditorInternalProps>(
  ({ element, elementService }) => {
    const [guiCssObj, setGuiCssObj] = useState<CssMap>(
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
        const elementModel = getElementModel(element)

        return elementService.update({
          ...elementModel,
          customCss: newCustomCss,
        })
      },
      [element, elementService],
    )

    useEffect(() => {
      /*
       * Make sure the new string is saved when unmounting the component
       * because if the panel is closed too quickly, the autosave won't catch the latest changes
       */
      return () => {
        void updateCustomCss(customCssStringRef.current).then()
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
        void updateCustomCss(customCssDebounced)
      }
    }, [customCssDebounced, updateCustomCss])

    const updateGuiCss = useCallback(
      (newGuiCss: string) => {
        const elementModel = getElementModel(element)

        return elementService.update({
          ...elementModel,
          guiCss: newGuiCss,
        })
      },
      [element, elementService],
    )

    useEffect(() => {
      /*
       * Make sure the new string is saved when unmounting the component
       * because if the panel is closed too quickly, the autosave won't catch the latest changes
       */
      return () => {
        void updateGuiCss(guiCssStringRef.current).then()
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
        void updateGuiCss(guiCssDebounced)
      }
    }, [guiCssDebounced, updateGuiCss])

    useEffect(() => {
      setGuiCssString(element.guiCss ?? '{}')
    }, [element.guiCss, setGuiCssString])

    if (!element.renderType) {
      return <>Add an atom to this element to edit its CSS</>
    }

    return (
      <Row style={{ marginBottom: '10%' }}>
        <Col span={24}>
          <CodeMirrorEditor
            height="100%"
            language={CodeMirrorLanguage.Css}
            onChange={(value) => setCustomCssString(value)}
            title="CSS Editor"
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
              header="Background"
              key="3"
            >
              <BackgroundEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
            <Panel
              className="site-collapse-custom-panel"
              header="Effects"
              key="4"
            >
              <EffectsEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
            <Panel
              className="site-collapse-custom-panel"
              header="Borders"
              key="5"
            >
              <BordersEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
            <Panel
              className="site-collapse-custom-panel"
              header="Shadows"
              key="6"
            >
              <ShadowsEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    )
  },
)
