'use client'

import type { IComponentModel } from '@codelab/frontend-abstract-domain'

import { RoutePaths } from '@codelab/frontend-abstract-application'
import { exportComponentService } from '@codelab/frontend-application-component/use-cases/export-component'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { downloadJsonAsFile } from '@codelab/frontend-shared-utils'
import { slugify } from '@codelab/shared-utils'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useAsyncFn } from 'react-use'

import { ComponentList } from './ComponentList'

export const CustomComponents = observer(() => {
  const { componentDomainService } = useDomainStore()
  const router = useRouter()

  const [, exportComponent] = useAsyncFn(async (component: IComponentModel) => {
    const result = await exportComponentService(component.id)

    downloadJsonAsFile(`${slugify(component.name)}.json`, result)
  })

  const editComponent = (componentId: string) => {
    router.push(RoutePaths.Component.builder({ componentId }))
  }

  const deleteComponent = (componentId: string) => {
    router.push(RoutePaths.Component.delete({ id: componentId }))
  }

  return (
    <ComponentList
      components={componentDomainService.componentList}
      onDelete={deleteComponent}
      onEdit={editComponent}
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
