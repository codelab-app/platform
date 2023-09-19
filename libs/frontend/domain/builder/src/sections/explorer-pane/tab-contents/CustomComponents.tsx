import type { IPageNode } from '@codelab/frontend/abstract/core'
import {
  componentRef,
  isComponentPageNode,
  isElementPageNode,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import {
  useAppQuery,
  useCurrentApp,
  useStore,
  useUserQuery,
} from '@codelab/frontend/presentation/container'
import { SkeletonWrapper } from '@codelab/frontend/presentation/view'
import { slugify } from '@codelab/shared/utils'
import { useAsync } from '@react-hookz/web'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { ComponentList } from './ComponentList'

export const CustomComponents = observer(() => {
  const { builderService, componentService } = useStore()
  const { appSlug } = useAppQuery()
  const router = useRouter()
  const { userSlug } = useUserQuery()
  const previousActiveNode = useRef<IPageNode>()

  const [{ error, status }, getComponents] = useAsync(() =>
    componentService.getAll(),
  )

  const isLoading = status === 'loading'

  useEffect(() => {
    void getComponents.execute()

    return onBack
  }, [])

  const editComponent = async (id: string) => {
    const { name } = componentService.component(id)
    const componentSlug = slugify(name)

    await router.push({
      pathname: PageType.ComponentBuilder,
      query: {
        appSlug,
        componentSlug,
        primarySidebarKey: ExplorerPaneType.Explorer,
        userSlug,
      },
    })
  }

  const selectComponent = (id: string) => {
    const component = componentService.component(id)
    builderService.selectComponentNode(component)
  }

  const exportComponent = (id: string) => {
    void router.push({
      pathname: PageType.ComponentExport,
      query: { id },
    })
  }

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
  }

  return (
    <SkeletonWrapper isLoading={isLoading}>
      {!isNil(error) ? error.message : null}
      <ComponentList
        components={componentService.componentList}
        onDelete={(id) => componentService.deleteModal.open(componentRef(id))}
        onEdit={(id) => editComponent(id)}
        onExport={(id) => exportComponent(id)}
        onSelect={(id) => selectComponent(id)}
        selectedIds={
          builderService.selectedNode
            ? [builderService.selectedNode.id]
            : undefined
        }
      />
    </SkeletonWrapper>
  )
})
