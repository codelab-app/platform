import { PageHeader } from '@ant-design/pro-components/lib'
import type { IComponent, IPageNode } from '@codelab/frontend/abstract/core'
import {
  componentRef,
  isComponentPageNode,
  isElementPageNode,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import {
  CreateComponentButton,
  CreateComponentForm,
} from '@codelab/frontend/domain/component'
import { CreateElementForm } from '@codelab/frontend/domain/element'
import { CreateFieldForm, UpdateFieldForm } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import { SkeletonWrapper } from '@codelab/frontend/presentation/view'
import { useAsync } from '@react-hookz/web'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import { ElementTree } from '../builder-tree'
import { StorePane } from '../StorePane'
import { ComponentList } from './ComponentList'

export const CustomComponents = observer(() => {
  const { builderService, componentService, elementService, fieldService } =
    useStore()

  const [activeComponent, setActiveComponent] = useState<IComponent>()
  const previousActiveNode = useRef<IPageNode>()

  const [{ error, status }, getComponents] = useAsync(() =>
    componentService.getAll(),
  )

  const isLoading = status === 'loading'

  useEffect(() => {
    void getComponents.execute()

    return onBack
  }, [])

  const editComponent = (id: string) => {
    const component = componentService.component(id)
    setActiveComponent(component)
    previousActiveNode.current = builderService.selectedNode?.current
    builderService.setActiveTab(RendererTab.Component)
    builderService.selectComponentNode(component)
  }

  const componentElementTree = activeComponent
    ? activeComponent.rootElement.current.antdNode
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

  const isInlineFormOpened =
    elementService.createForm.isOpen ||
    fieldService.createForm.isOpen ||
    fieldService.updateForm.isOpen

  const selectTreeNode = (node: IPageNode) => {
    if (isComponentPageNode(node)) {
      return builderService.selectComponentNode(node)
    }

    if (isElementPageNode(node)) {
      return builderService.selectElementNode(node)
    }

    return
  }

  return (
    <SkeletonWrapper isLoading={isLoading}>
      {!isNil(error) ? error.message : null}
      {activeComponent ? (
        <>
          <PageHeader onBack={onBack} title="Edit" />
          {elementService.createForm.isOpen && <CreateElementForm />}
          {fieldService.createForm.isOpen && <CreateFieldForm />}
          {fieldService.updateForm.isOpen && <UpdateFieldForm />}

          {!isInlineFormOpened && (
            <>
              {componentElementTree && (
                <ElementTree
                  expandedNodeIds={
                    builderService.expandedPageElementTreeNodeIds
                  }
                  selectTreeNode={selectTreeNode}
                  setActiveTab={() =>
                    builderService.setActiveTab(RendererTab.Page)
                  }
                  setExpandedNodeIds={builderService.setExpandedPageElementTreeNodeIds.bind(
                    builderService,
                  )}
                  treeData={componentElementTree}
                />
              )}
              <StorePane
                isLoading={isLoading}
                store={activeComponent.store.current}
              />
            </>
          )}
        </>
      ) : (
        <>
          <div style={{ marginBottom: 10, textAlign: 'right' }}>
            <CreateComponentButton />
          </div>
          {componentService.createForm.isOpen ? (
            <CreateComponentForm />
          ) : (
            <ComponentList
              components={componentService.componentList}
              onDelete={(id) =>
                componentService.deleteModal.open(componentRef(id))
              }
              onEdit={(id) => editComponent(id)}
            />
          )}
        </>
      )}
    </SkeletonWrapper>
  )
})
