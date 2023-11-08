import {
  BorderOuterOutlined,
  CodeSandboxOutlined,
  DeploymentUnitOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import type {
  IElementModel,
  IElementTreeViewDataNode,
} from '@codelab/frontend/abstract/domain'
import {
  elementRef,
  elementTreeRef,
  isComponent,
} from '@codelab/frontend/abstract/domain'
import { FormNames } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { mapElementOption } from '@codelab/frontend/domain/element'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface ElementTreeItemElementTitleProps {
  element: IElementModel
  treeNode: IElementTreeViewDataNode
}

export const ElementTreeItemElementTitle = observer(
  ({ element, treeNode }: ElementTreeItemElementTitleProps) => {
    const { elementService } = useStore()
    const { popover } = useCui()
    const atomName = element.atomName

    const componentInstanceName = treeNode.isChildMapperComponentInstance
      ? element.parentComponent?.maybeCurrent?.name
      : isComponent(element.renderType)
      ? element.renderType.maybeCurrent?.name
      : null

    const componentMeta = componentInstanceName
      ? `instance of ${componentInstanceName}`
      : undefined

    const atomMeta = atomName ? `${atomName}` : undefined
    const meta = componentMeta ?? atomMeta ?? ''
    const { selectable: treeNodeIsSelectable = true } = treeNode

    const errorMessage = element.renderingMetadata?.error
      ? `Error: ${element.renderingMetadata.error.message}`
      : element.ancestorError
      ? `Something went wrong in a parent element`
      : elementService.validationService.propsHaveErrors(element)
      ? `Some props are not correctly set`
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
        primaryTitle={treeNode.primaryTitle}
        secondaryTitle={meta}
        tag={
          errorMessage ? (
            <Tooltip title={errorMessage}>
              <ExclamationCircleOutlined style={{ color: 'red' }} />
            </Tooltip>
          ) : null
        }
        toolbar={
          treeNodeIsSelectable && (
            <CuiTreeItemToolbar
              items={[
                {
                  icon: <PlusOutlined />,
                  key: `add-child-${element.id}`,
                  onClick: () => {
                    popover.open(FormNames.CreateElement)
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
          )
        }
        variant={errorMessage ? 'danger' : 'primary'}
      />
    )
  },
)
