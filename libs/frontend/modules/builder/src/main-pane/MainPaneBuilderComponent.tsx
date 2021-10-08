import { PageType } from '@codelab/frontend/model/state/router'
import {
  CreateElementButton,
  DeleteElementModal,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import { useRouter } from 'next/router'
import React from 'react'
import { MainPaneBuilder } from './MainPaneBuilder'

export const MainPaneBuilderComponent = () => {
  const { elementTree } = useElementGraphContext()
  const root = elementTree?.getRootVertex(ElementTree.isComponent)
  const router = useRouter()
  const { reset } = useCrudModalForm(EntityType.Component)

  if (!elementTree || !root || !root.componentTag) {
    return null
  }

  return (
    <MainPaneBuilder
      key={root.id}
      title={root.componentTag?.name}
      headerProps={{
        onBack: () => router.push({ pathname: PageType.ComponentList }),
      }}
      header={<CreateElementButton key={0} />}
    >
      <DeleteElementModal formProps={{ onSubmitSuccess: () => reset() }} />
    </MainPaneBuilder>
  )
}
