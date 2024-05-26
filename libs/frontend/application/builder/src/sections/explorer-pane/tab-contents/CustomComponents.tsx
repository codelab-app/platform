import type { IRuntimeModel } from '@codelab/frontend/abstract/application'
import {
  isRuntimeComponent,
  isRuntimeElement,
  RendererTab,
} from '@codelab/frontend/abstract/application'
import { componentRef } from '@codelab/frontend/abstract/domain'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { SkeletonWrapper } from '@codelab/frontend-presentation-view/components'
import { slugify } from '@codelab/shared/utils'
import { useAsync } from '@react-hookz/web'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { useEffect, useRef } from 'react'
import { ComponentList } from './ComponentList'

export const CustomComponents = observer(() => {
  const { builderService, componentService } = useStore()
  const router = useRouter()
  const previousActiveNode = useRef<IRuntimeModel>()

  const [{ error, status }, getComponents] = useAsync(() =>
    componentService.getAll(),
  )

  const [, exportComponent] = useAsync(componentService.exportComponent)
  const isLoading = status === 'loading'

  useEffect(() => {
    void getComponents.execute()

    return onBack
  }, [])

  const editComponent = async (id: string) => {
    const { name } = componentService.componentDomainService.component(id)
    const componentSlug = slugify(name)

    const url = queryString.stringifyUrl({
      query: {
        componentSlug,
        primarySidebarKey: ExplorerPaneType.Explorer,
      },
      url: PageType.ComponentBuilder,
    })

    await router.push(url)
  }

  const onBack = () => {
    builderService.setActiveTab(RendererTab.Page)

    if (
      previousActiveNode.current &&
      isRuntimeComponent(previousActiveNode.current)
    ) {
      builderService.selectComponentNode(previousActiveNode.current)
    }

    if (
      previousActiveNode.current &&
      isRuntimeElement(previousActiveNode.current)
    ) {
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
        onExport={(component) => void exportComponent.execute(component)}
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
