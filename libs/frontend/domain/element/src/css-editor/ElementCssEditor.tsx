import { CaretRightOutlined } from '@ant-design/icons'
import type {
  CssMap,
  IBuilderService,
  IElement,
  IElementService,
} from '@codelab/frontend/abstract/core'
import { CodeMirrorEditor } from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { useDebouncedEffect } from '@react-hookz/web'
import { Col, Collapse, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef } from 'react'
import { getElementModel } from '../utils/get-element-model'
import { BackgroundEditor } from './css-background-editor/BackgroundEditor'
import { BordersEditor } from './css-borders-editor/BordersEditor'
import { EffectsEditor } from './css-effects-editor/EffectsEditor'
import { LayoutEditor } from './css-layout-editor'
import { ShadowsEditor } from './css-shadows-editor'
import { FontEditor } from './font-editor'

const { Panel } = Collapse

export interface ElementCssEditorInternalProps {
  builderService: IBuilderService
  element: IElement
  elementService: IElementService
}

/*
  TODO: later
  - define the interfaces for what Css changes are possible? basically what potential values
    can guiCss be set to?
  */
export const ElementCssEditor = observer<ElementCssEditorInternalProps>(
  ({ builderService, element, elementService }) => {
    const breakpoint = builderService.selectedBuilderBreakpoint
    const { cssString, guiString } = element.styleParsed[breakpoint] ?? {}
    const guiCssObj = JSON.parse(guiString ?? '{}') as CssMap
    const lastStateRef = useRef({ cssString, guiString, style: element.style })

    const cssChangeHandler = useCallback(
      (value: string) => element.setCustomCss(value, breakpoint),
      [element, breakpoint],
    )

    const updateElementStyles = useCallback(
      (style: IElement['style']) => {
        const elementModel = getElementModel(element)
        const lastState = lastStateRef.current
        const breakpointStyle = element.styleParsed[breakpoint] ?? {}

        const {
          cssString: lastCustomCss,
          guiString: lastGuiCss,
          style: oldStyle,
        } = lastState

        const { cssString: currentCss, guiString: currentGuiCss } =
          breakpointStyle

        console.log(element.style === oldStyle, oldStyle)

        // do not send request if value was not changed
        // if (currentCss !== lastCustomCss || currentGuiCss !== lastGuiCss) {
        if (oldStyle !== style) {
          lastStateRef.current = { cssString, guiString, style }

          void elementService.update({ ...elementModel, style })
        }
      },
      [element, elementService, breakpoint],
    )

    useDebouncedEffect(
      () => updateElementStyles(element.style),
      [element],
      1000,
    )

    useEffect(
      /*
       * Make sure the new string is saved when unmounting the component
       * because if the panel is closed too quickly, the autosave won't catch the latest changes
       */
      () => () => updateElementStyles(element.style),
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
            value={cssString ?? ''}
          />
        </Col>
        <Col span={24}>
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Panel header="Layout" key="1">
              <LayoutEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
            <Panel header="Font" key="2">
              <FontEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
            <Panel header="Background" key="3">
              <BackgroundEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
            <Panel header="Effects" key="4">
              <EffectsEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
            <Panel header="Borders" key="5">
              <BordersEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
            <Panel header="Shadows" key="6">
              <ShadowsEditor element={element} guiCssObj={guiCssObj} />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    )
  },
)
