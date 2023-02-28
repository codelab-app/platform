import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { IElementService, INode } from '@codelab/frontend/abstract/core'
import {
  COMPONENT_NODE_TYPE,
  ELEMENT_NODE_TYPE,
} from '@codelab/frontend/abstract/core'
import { CreateElementButton } from '@codelab/frontend/domain/element'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Col, Dropdown, Row, Tooltip } from 'antd'
import type { DataNode } from 'antd/lib/tree'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { BuilderDropHandler } from '../../../dnd/BuilderDropHandler'
import type { ComponentContextMenuProps } from '../ComponentContextMenu'
import { ComponentContextMenu } from '../ComponentContextMenu'
import type { ElementContextMenuProps } from '../ElementContextMenu'
import { ElementContextMenu } from '../ElementContextMenu'
import { BuilderTreeItemOverlay } from './BuilderTreeItem-Overlay'
import { ItemTitleStyle } from './ItemTitleStyle'

interface BuilderTreeItemTitleProps {
  node: INode | undefined
  data: DataNode
  elementContextMenuProps: Omit<ElementContextMenuProps, 'element'>
  componentContextMenuProps: Omit<ComponentContextMenuProps, 'component'>
  elementService: IElementService
}

export const BuilderTreeItemTitle = observer<BuilderTreeItemTitleProps>(
  ({
    node,
    data,
    elementContextMenuProps,
    componentContextMenuProps,
    elementService,
  }) => {
    const [contextMenuItemId, setContextMenuNodeId] =
      useState<Nullable<string>>(null)

    // Add CSS to disable hover if node is unselectable
    if (node?.__nodeType === ELEMENT_NODE_TYPE) {
      const element = node
      const atomName = element.atomName

      const componentInstanceName =
        element.renderComponentType?.maybeCurrent?.name

      const isComponentInstance = Boolean(element.renderComponentType)

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
        <BuilderDropHandler element={element}>
          <ItemTitleStyle node={data}>
            <Dropdown
              onOpenChange={(visible) => {
                setContextMenuNodeId(visible ? element.id : null)
              }}
              open={contextMenuItemId === element.id}
              overlay={
                <BuilderTreeItemOverlay
                  ContextMenu={ElementContextMenu}
                  contextMenuProps={{
                    ...elementContextMenuProps,
                    element,
                  }}
                  setContextMenuNodeId={setContextMenuNodeId}
                  type={ELEMENT_NODE_TYPE}
                />
              }
              trigger={['contextMenu']}
            >
              <Row>
                <Col span={18}>
                  <div
                    css={
                      isComponentInstance ? tw`text-blue-400` : `text-gray-400`
                    }
                  >
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
            </Dropdown>
          </ItemTitleStyle>
        </BuilderDropHandler>
      )
    }

    if (node?.__nodeType === COMPONENT_NODE_TYPE) {
      const component = node

      return (
        <ItemTitleStyle node={data}>
          <Dropdown
            onOpenChange={(visible) => {
              setContextMenuNodeId(visible ? component.id : null)
            }}
            open={contextMenuItemId === component.id}
            overlay={
              <BuilderTreeItemOverlay
                ContextMenu={ComponentContextMenu}
                contextMenuProps={{
                  ...componentContextMenuProps,
                  component,
                }}
                setContextMenuNodeId={setContextMenuNodeId}
                type={COMPONENT_NODE_TYPE}
              />
            }
            trigger={['contextMenu']}
          >
            <Row justify="space-between">
              <Col css={tw`px-2`}>{component.name}</Col>
              <Col css={tw`px-2`}>
                <CreateElementButton
                  createModal={elementService.createModal}
                  key={0}
                  parentElementId={node.id}
                  type="text"
                />
              </Col>
            </Row>
          </Dropdown>
        </ItemTitleStyle>
      )
    }

    return (
      <ItemTitleStyle node={data}>
        <>{data.title}</>
      </ItemTitleStyle>
    )
  },
)

BuilderTreeItemTitle.displayName = 'BuilderTreeItemTitle'
