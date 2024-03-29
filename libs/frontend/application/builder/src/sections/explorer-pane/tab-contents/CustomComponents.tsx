import type { IPageNode } from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  isComponent,
  isElement,
  RendererTab,
} from '@codelab/frontend/abstract/domain'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  useAppQuery,
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
  const { builderService, componentService, rendererService } = useStore()
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
    const { name } = componentService.componentDomainService.component(id)
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

  const exportComponent = (id: string) => {
    void router.push({
      pathname: PageType.ComponentExport,
      query: { id },
    })
  }

  const onBack = () => {
    builderService.setActiveTab(RendererTab.Page)

    if (previousActiveNode.current && isComponent(previousActiveNode.current)) {
      builderService.selectComponentNode(previousActiveNode.current)
    }

    if (previousActiveNode.current && isElement(previousActiveNode.current)) {
      builderService.selectElementNode(previousActiveNode.current)
    }
  }

  return (
    <SkeletonWrapper isLoading={isLoading}>
      {!isNil(error) ? error.message : null}
      <ComponentList
        components={componentService.componentDomainService.componentList}
        onDelete={(id) => componentService.deleteModal.open(componentRef(id))}
        onEdit={(id) => editComponent(id)}
        onExport={(id) => exportComponent(id)}
        onSelect={componentService.previewComponent}
        selectedIds={
          builderService.selectedNode
            ? [builderService.selectedNode.id]
            : undefined
        }
      />
    </SkeletonWrapper>
  )
})
