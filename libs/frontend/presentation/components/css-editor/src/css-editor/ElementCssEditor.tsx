'use client'

import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import { CSS_AUTOSAVE_TIMEOUT } from '@codelab/frontend/abstract/domain'
import { useElementService } from '@codelab/frontend-application-element/services'
import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { useDebouncedCallback, useDebouncedEffect } from '@react-hookz/web'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { InheritedStyles } from '../inherited-styles/InheritedStyles'
import { TailwindClassEditor } from '../tailwind-class-editor/TailwindClassEditor'
import { StylesEditor } from './StylesEditor'

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  height: 32px;
`

export interface ElementCssEditorInternalProps {
  runtimeElement: IRuntimeElementModel
}

/*
  TODO: later
  - define the interfaces for what Css changes are possible? basically what potential values
    can guiCss be set to?
  */
export const ElementCssEditor = observer<ElementCssEditorInternalProps>(
  ({ runtimeElement }) => {
    const elementService = useElementService()
    const lastStateRef = useRef(runtimeElement.style.toString())

    const lastTailwindClassNames = useRef(
      runtimeElement.element.current.tailwindClassNames,
    )

    const cssChangeHandler = useDebouncedCallback(
      (value: string) => {
        runtimeElement.style.setCustomCss(value)
      },
      [runtimeElement],
      CSS_AUTOSAVE_TIMEOUT,
    )

    const updateElementStyles = useCallback(
      // TODO: Make this ito IElementDto
      (updatedElement: IRuntimeElementModel) => {
        const oldStyle = lastStateRef.current
        const oldTailwindClassNames = lastTailwindClassNames.current
        const { element, style } = updatedElement
        const tailwindClassNames = element.current.tailwindClassNames
        const styleString = style.toString()

        // do not send request if value was not changed
        if (
          oldStyle !== styleString ||
          oldTailwindClassNames !== tailwindClassNames
        ) {
          lastStateRef.current = styleString
          lastTailwindClassNames.current = tailwindClassNames

          void elementService.update({
            ...element.current.toJson,
            style: styleString,
            tailwindClassNames,
          })
        }
      },
      [elementService],
    )

    useDebouncedEffect(
      () => {
        updateElementStyles(runtimeElement)
      },
      [
        runtimeElement.style.toString(),
        runtimeElement.element.current.tailwindClassNames,
      ],
      CSS_AUTOSAVE_TIMEOUT,
    )

    useEffect(
      /*
       * Make sure the new string is saved when unmounting the component
       * because if the panel is closed too quickly, the autosave won't catch the latest changes
       */
      () => () => {
        updateElementStyles(runtimeElement)
      },
      [runtimeElement, updateElementStyles],
    )

    return (
      <Row style={{ marginBottom: '10%' }}>
        <Col span={24}>
          <Label>Inherited css :</Label>
          <InheritedStyles runtimeElement={runtimeElement} />
        </Col>
        <Col span={24}>
          <Label>Current breakpoint css :</Label>
          <CodeMirrorEditor
            height="100%"
            language={CodeMirrorLanguage.Css}
            onChange={cssChangeHandler}
            title="CSS Editor"
            value={runtimeElement.style.customCss ?? ''}
          />
        </Col>
        <Col span={24}>
          <TailwindClassEditor element={runtimeElement.element.current} />
        </Col>
        <Col span={24}>
          <StylesEditor selectedNode={runtimeElement} />
        </Col>
      </Row>
    )
  },
)
