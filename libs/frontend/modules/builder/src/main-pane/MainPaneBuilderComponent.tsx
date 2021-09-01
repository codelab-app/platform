import { PageType } from '@codelab/frontend/model/state/router'
import {
  ComponentContext,
  CreateComponentElementModal,
  refetchGetComponentElementsQuery,
} from '@codelab/frontend/modules/component'
import {
  CreateElementButton,
  DeleteElementModal,
} from '@codelab/frontend/modules/element'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { useBuilder } from '../containers/useBuilder'
import { MainPaneBuilder } from './MainPaneBuilder'

export const MainPaneBuilderComponent = () => {
  const { tree, component } = useContext(ComponentContext)
  const router = useRouter()

  const {
    state: { selectedElement },
  } = useBuilder()

  return (
    <MainPaneBuilder
      key={component.id}
      tree={tree}
      title={component.name}
      moveElementRefetchQueries={[
        refetchGetComponentElementsQuery({
          input: { componentId: component.id },
        }),
      ]}
      headerProps={{
        onBack: () => router.push({ pathname: PageType.ComponentList }),
      }}
      header={<CreateElementButton key={0} />}
    >
      <CreateComponentElementModal
        initialData={{ parentElementId: selectedElement?.id }}
      />
      <DeleteElementModal
        formProps={{
          refetchQueries: [
            refetchGetComponentElementsQuery({
              input: { componentId: component.id },
            }),
          ],
        }}
      />
    </MainPaneBuilder>
  )
}
