import type {
  IElementModel,
  IElementService,
} from '@codelab/frontend/abstract/domain'
import { CodeMirrorEditor } from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { useDebouncedCallback, useDebouncedEffect } from '@react-hookz/web'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { InheritedStyles } from './inherited-styles/InheritedStyles'
import { StylesEditor } from './StylesEditor'
import { TailwindClassEditor } from './tailwind-class-editor/TailwindClassEditor'

const autosaveTimeout = 1000

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  height: 32px;
`

export interface ElementCssEditorInternalProps {
  element: IElementModel
  elementService: IElementService
}

/*
  TODO: later
  - define the interfaces for what Css changes are possible? basically what potential values
    can guiCss be set to?
  */
export const ElementCssEditor = observer<ElementCssEditorInternalProps>(
  ({ element, elementService }) => {
    const lastStateRef = useRef(element.style)
    const lastTailwindClassNames = useRef(element.tailwindClassNames)

    const cssChangeHandler = useDebouncedCallback(
      (value: string) => element.setCustomCss(value),
      [element],
      autosaveTimeout,
    )

    const updateElementStyles = useCallback(
      // TODO: Make this ito IElementDto
      (updatedElement: IElementModel) => {
        const oldStyle = lastStateRef.current
        const oldTailwindClassNames = lastTailwindClassNames.current
        const { style, tailwindClassNames } = updatedElement

        // do not send request if value was not changed
        if (
          oldStyle !== style ||
          oldTailwindClassNames !== tailwindClassNames
        ) {
          lastStateRef.current = style
          lastTailwindClassNames.current = tailwindClassNames

          void elementService.update({
            ...elementModel,
            style,
            tailwindClassNames,
          })
        }
      },
      [elementService],
    )

    useDebouncedEffect(
      () => updateElementStyles(element),
      [element.style, element.tailwindClassNames],
      autosaveTimeout,
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
          <Label>Inherited css :</Label>
          <InheritedStyles element={element} />
        </Col>
        <Col span={24}>
          <Label>Current breakpoint css :</Label>
          <CodeMirrorEditor
            height="100%"
            language={CodeMirrorLanguage.Css}
            onChange={cssChangeHandler}
            title="CSS Editor"
            value={element.customCss ?? ''}
          />
        </Col>
        <Col span={24}>
          <StylesEditor />
          <TailwindClassEditor element={element} />
        </Col>
      </Row>
    )
  },
)
