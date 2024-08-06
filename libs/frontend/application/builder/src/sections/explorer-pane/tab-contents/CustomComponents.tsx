'use client'

import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import { downloadJsonAsFile } from '@codelab/frontend/shared/utils'
import { useDeleteComponentModal } from '@codelab/frontend-application-component/use-cases/delete-component'
import { exportComponentService } from '@codelab/frontend-application-component/use-cases/export-component'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { SkeletonWrapper } from '@codelab/frontend-presentation-view/components/skeleton'
import type { IComponentDto } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { ComponentList } from './ComponentList'
import { useComponentsList } from './useComponentsList.hook'

interface CustomComponentProps {
  components: Array<IComponentDto>
}

export const CustomComponents = observer((props: CustomComponentProps) => {
  const components = useComponentsList(props.components)
  const { componentDomainService } = useDomainStore()
  const deleteComponentModal = useDeleteComponentModal()
  const router = useRouter()

  const [state, getComponents] = useAsyncFn(() =>
    // componentService.getAll(),
    Promise.resolve(),
  )

  const [exportState, exportComponent] = useAsyncFn(
    async (component: IComponentModel) => {
      const result = await exportComponentService(component.id)

      downloadJsonAsFile(`${slugify(component.name)}.json`, result)
    },
  )

  const isLoading = state.loading

  useEffect(() => {
    void getComponents()
  }, [getComponents])

  const editComponent = async (id: string) => {
    const { name } = componentDomainService.component(id)
    const componentSlug = slugify(name)

    const url = queryString.stringifyUrl({
      query: { primarySidebarKey: ExplorerPaneType.Explorer },
      url: PageType.ComponentBuilder.replace('[componentSlug]', componentSlug),
    })

    await router.push(url)
  }

  return (
    <SkeletonWrapper isLoading={isLoading}>
      {!isNil(state.error) ? state.error.message : null}
      <ComponentList
        components={components}
        onDelete={(id) =>
          deleteComponentModal.open(componentDomainService.component(id))
        }
        onEdit={(id) => editComponent(id)}
        onExport={(component) => exportComponent(component)}
        // onSelect={componentService.previewComponent}
        // selectedIds={
        //   builderService.selectedNode
        //     ? [builderService.selectedNode.id]
        //     : undefined
        // }
      />
    </SkeletonWrapper>
  )
})
