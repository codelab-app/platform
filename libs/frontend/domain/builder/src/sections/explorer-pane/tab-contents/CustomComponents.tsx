import { PageHeader } from '@ant-design/pro-components/lib'
import type {
  IBuilderDataNode,
  IComponent,
  IPageNode,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  elementRef,
  isComponentPageNode,
  isElementPageNode,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import { CreateComponentButton } from '@codelab/frontend/domain/component'
import { useStore } from '@codelab/frontend/presentation/container'
import { SkeletonWrapper } from '@codelab/frontend/presentation/view'
import { useAsync } from '@react-hookz/web'
import { Tree } from 'antd'
import has from 'lodash/has'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import { BuilderTreeItemTitle } from '../builder-tree'
import { antdTreeStyle } from '../builder-tree/antd-tree.styles'
import {
  DISABLE_HOVER_CLASSNAME,
  disableTreeNodeWrapperHoverStyle,
  TREE_NODE_WRAPPER_SELECTOR,
} from '../builder-tree/disable-node-hover-effects'
import { ComponentList } from './ComponentList'

export const CustomComponents = observer(() => {
  const { builderService, componentService, elementService } = useStore()
  const [activeComponent, setActiveComponent] = useState<IComponent>()
  const previousActiveNode = useRef<IPageNode>()

  const [{ error, status }, getComponents] = useAsync(() =>
    componentService.getAll(),
  )

  useEffect(() => {
    void getComponents.execute()

    return onBack
  }, [])

  const loadComponent = async (id: string) => {
    const component = await componentService.getOne(id)
    setActiveComponent(component)

    if (component) {
      previousActiveNode.current = builderService.selectedNode?.current
      builderService.setActiveTab(RendererTab.Component)
      builderService.selectComponentNode(component)
    }
  }

  const componentTree = activeComponent
    ? [
        {
          children: [activeComponent.rootElement.current.antdNode].filter(
            (data): data is IBuilderDataNode => Boolean(data),
          ),
          key: activeComponent.id,
          node: activeComponent,
          rootKey: activeComponent.rootElement.id,
          // This should bring up a meta pane for editing the component
          selectable: true,
          title: activeComponent.name,
        },
      ]
    : undefined

  const onBack = () => {
    builderService.setActiveTab(RendererTab.Page)

    if (
      previousActiveNode.current &&
      isComponentPageNode(previousActiveNode.current)
    ) {
      builderService.selectComponentNode(previousActiveNode.current)
    }

    if (
      previousActiveNode.current &&
      isElementPageNode(previousActiveNode.current)
    ) {
      builderService.selectElementNode(previousActiveNode.current)
    }

    setActiveComponent(undefined)
  }

  return (
    <SkeletonWrapper isLoading={status === 'loading'}>
      {!isNil(error) ? error.message : null}
      {activeComponent ? (
        <>
          <PageHeader onBack={onBack} title="Edit" />
          <Tree<IBuilderDataNode>
            blockNode
            css={[disableTreeNodeWrapperHoverStyle, antdTreeStyle]}
            defaultExpandAll
            onClick={(event) => event.stopPropagation()}
            onExpand={(expandedKeys) => {
              return builderService.setExpandedComponentTreeNodeIds(
                expandedKeys as Array<string>,
              )
            }}
            onMouseEnter={({ event, node }) => {
              // Selectable by default, unless it's not
              if (has(node, 'selectable') && !node.selectable) {
                const target = event.target as Element

                // This is where the hover effect is set
                const treeNodeWrapper = target.closest(
                  TREE_NODE_WRAPPER_SELECTOR,
                )

                treeNodeWrapper?.classList.add(DISABLE_HOVER_CLASSNAME)
              }

              builderService.setHoveredNode(elementRef(node.key.toString()))
            }}
            onMouseLeave={() => builderService.setHoveredNode(null)}
            onSelect={([id], { nativeEvent, node }) => {
              nativeEvent.stopPropagation()

              if (!id) {
                return
              }

              if (isComponentPageNode(node.node)) {
                builderService.selectComponentNode(node.node)
              }

              if (isElementPageNode(node.node)) {
                builderService.selectElementNode(node.node)
              }
            }}
            selectedKeys={
              builderService.selectedNode
                ? [builderService.selectedNode.id]
                : []
            }
            showLine
            titleRender={(data) => (
              <BuilderTreeItemTitle
                componentContextMenuProps={{
                  deleteModal: componentService.deleteModal,
                }}
                data={data}
                elementContextMenuProps={{
                  cloneElement:
                    elementService.cloneElement.bind(elementService),
                  convertElementToComponent:
                    elementService.convertElementToComponent.bind(
                      elementService,
                    ),
                  createModal: elementService.createModal,
                  deleteModal: elementService.deleteModal,
                }}
                node={data.node}
              />
            )}
            treeData={componentTree}
          />
        </>
      ) : (
        <>
          <div style={{ marginBottom: 10, textAlign: 'right' }}>
            <CreateComponentButton />
          </div>
          <ComponentList
            components={componentService.componentList}
            onDelete={(id) =>
              componentService.deleteModal.open(componentRef(id))
            }
            onEdit={(id) => loadComponent(id)}
          />
        </>
      )}
    </SkeletonWrapper>
  )
})
