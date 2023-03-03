import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { IElement } from '@codelab/frontend/abstract/core'
import { isComponentModel } from '@codelab/frontend/domain/component'
import { Col, Row, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

interface BuilderTreeItemElementTitleProps {
  element: IElement
}

export const BuilderTreeItemElementTitle = observer(
  ({ element }: BuilderTreeItemElementTitleProps) => {
    const atomName = element.atomName
    const isComponentInstance = isComponentModel(element.renderType)

    const componentInstanceName = isComponentInstance
      ? element.renderType?.maybeCurrent?.name
      : null

    const componentMeta = componentInstanceName
      ? `(instance of ${componentInstanceName || 'a Component'})`
      : undefined

    const atomMeta = atomName ? `(${atomName})` : undefined
    const meta = componentMeta || atomMeta || ''

    const errorMessage = element.renderingMetadata?.error
      ? `Error: ${element.renderingMetadata.error.message}`
      : element.ancestorError
      ? `Something went wrong in a parent element`
      : undefined

    return (
      <Row>
        <Col span={18}>
          <div css={isComponentInstance ? tw`text-blue-400` : `text-gray-400`}>
            {element.label} <span css={tw`text-xs`}>{meta}</span>
          </div>
        </Col>
        <Col span={6}>
          <Row justify="end">
            <Col>
              {errorMessage && (
                <Tooltip placement="right" title={errorMessage}>
                  <ExclamationCircleOutlined style={{ color: 'red' }} />
                </Tooltip>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  },
)
