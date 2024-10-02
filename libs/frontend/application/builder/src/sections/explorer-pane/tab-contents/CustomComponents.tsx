'use client'

import type { IComponentModel } from '@codelab/frontend/abstract/domain'

import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import { downloadJsonAsFile } from '@codelab/frontend/shared/utils'
import { useDeleteComponentModal } from '@codelab/frontend-application-component/use-cases/delete-component'
import { exportComponentService } from '@codelab/frontend-application-component/use-cases/export-component'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { slugify } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import { useAsyncFn } from 'react-use'

import { ComponentList } from './ComponentList'

export const CustomComponents = observer(() => {
  const { componentDomainService } = useDomainStore()
  const deleteComponentModal = useDeleteComponentModal()
  const router = useRouter()

  const [, exportComponent] = useAsyncFn(async (component: IComponentModel) => {
    const result = await exportComponentService(component.id)

    downloadJsonAsFile(`${slugify(component.name)}.json`, result)
  })

  const editComponent = async (componentId: string) => {
    const url = queryString.stringifyUrl({
      query: { primarySidebarKey: ExplorerPaneType.Explorer },
      url: PageType.ComponentBuilder({ componentId }),
    })

    await router.push(url)
  }

  return (
    <ComponentList
      components={componentDomainService.componentList}
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
  )
})
