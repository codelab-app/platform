import BorderOuterOutlined from '@ant-design/icons/BorderOuterOutlined'
import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined'
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type {
  IElementModel,
  IElementTreeViewDataNode,
} from '@codelab/frontend/abstract/domain'
import {
  elementRef,
  elementTreeRef,
  isComponentRef,
} from '@codelab/frontend/abstract/domain'
import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
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
      : isComponentRef(element.renderType)
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
      ? 'Something went wrong in a parent element'
      : elementService.validationService.propsHaveErrors(element)
      ? 'Some props are not correctly set'
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
                  cuiKey:
                    `${MODEL_ACTION.CreateElement.key}-${element.id}` as ModelActionKey,
                  icon: <PlusOutlined />,
                  onClick: () => {
                    popover.open(MODEL_ACTION.CreateElement.key)
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
