import {
  BorderOuterOutlined,
  CodeSandboxOutlined,
  DeploymentUnitOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import type { IElement } from '@codelab/frontend/abstract/core'
import {
  elementRef,
  elementTreeRef,
  isComponentInstance,
} from '@codelab/frontend/abstract/core'
import { mapElementOption } from '@codelab/frontend/domain/element'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface ElementTreeItemElementTitleProps {
  element: IElement
}

export const ElementTreeItemElementTitle = observer(
  ({ element }: ElementTreeItemElementTitleProps) => {
    const { elementService } = useStore()
    const atomName = element.atomName
    const componentInstance = isComponentInstance(element.renderType)

    const componentInstanceName = componentInstance
      ? element.renderType?.maybeCurrent?.name
      : null

    const componentMeta = componentInstanceName
      ? `instance of ${componentInstanceName || 'a Component'}`
      : undefined

    const atomMeta = atomName ? `${atomName}` : undefined
    const meta = componentMeta || atomMeta || ''

    const errorMessage = element.renderingMetadata?.error
      ? `Error: ${element.renderingMetadata.error.message}`
      : element.ancestorError
      ? `Something went wrong in a parent element`
      : undefined

    return (
      <CuiTreeItem
        icon={
          componentMeta ? (
            <CodeSandboxOutlined style={{ color: 'blue' }} />
          ) : atomMeta ? (
            <DeploymentUnitOutlined style={{ color: 'green' }} />
          ) : (
            <BorderOuterOutlined style={{ color: 'gray' }} />
          )
        }
        primaryTitle={element.label}
        secondaryTitle={meta}
        tag={
          errorMessage ? (
            <Tooltip title={errorMessage}>
              <ExclamationCircleOutlined style={{ color: 'red' }} />
            </Tooltip>
          ) : null
        }
        toolbar={
          <CuiTreeItemToolbar
            items={[
              {
                icon: <PlusOutlined />,
                key: `add-child-${element.id}`,
                onClick: () => {
                  elementService.createForm.open({
                    elementOptions:
                      element.closestContainerNode.elements.map(
                        mapElementOption,
                      ),
                    elementTree: elementTreeRef(
                      element.closestContainerNode.id,
                    ),
                    selectedElement: elementRef(element.id),
                  })
                },
                title: 'Add Child',
              },
            ]}
            title="ElementTreeItemToolbar"
          />
        }
        variant={errorMessage ? 'danger' : 'primary'}
      />
    )
  },
)
