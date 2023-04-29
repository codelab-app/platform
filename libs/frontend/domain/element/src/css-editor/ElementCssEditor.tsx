import { CaretRightOutlined } from '@ant-design/icons'
import type {
  CssMap,
  IElement,
  IElementService,
} from '@codelab/frontend/abstract/core'
import { CodeMirrorEditor } from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { useDebouncedEffect } from '@react-hookz/web'
import { Col, Collapse, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef } from 'react'
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
    const guiCssObj = JSON.parse(element.guiCss ?? '{}') as CssMap

    const lastStateRef = useRef({
      customCss: element.customCss,
      guiCss: element.guiCss,
    })

    const cssChangeHandler = useCallback(
      (value: string) => element.setCustomCss(value),
      [element],
    )

    const updateElementStyles = useCallback(
      ({ customCss, guiCss }: IElement) => {
        const elementModel = getElementModel(element)
        const lastState = lastStateRef.current
        const { customCss: lastCustomCss, guiCss: lastGuiCss } = lastState

        // do not send request if value was not changed
        if (customCss !== lastCustomCss || guiCss !== lastGuiCss) {
          lastStateRef.current = { customCss, guiCss }

          void elementService.update({ ...elementModel, customCss, guiCss })
        }
      },
      [element, elementService],
    )

    useDebouncedEffect(
      () => updateElementStyles(element),
      [element.guiCss, element.customCss],
      1000,
    )

    useEffect(
      /*
       * Make sure the new string is saved when unmounting the component
       * because if the panel is closed too quickly, the autosave won't catch the latest changes
       */
      () => () => updateElementStyles(element),
      [element, updateElementStyles],
    )

    return (
      <Row style={{ marginBottom: '10%' }}>
        <Col span={24}>
          <CodeMirrorEditor
            height="100%"
            language={CodeMirrorLanguage.Css}
            onChange={cssChangeHandler}
            title="CSS Editor"
            value={element.customCss ?? ''}
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
