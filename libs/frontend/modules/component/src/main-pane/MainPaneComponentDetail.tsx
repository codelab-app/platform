import { PageType } from '@codelab/frontend/model/state/router'
import { MainPaneBuilder, useBuilder } from '@codelab/frontend/modules/builder'
import {
  CreateElementButton,
  DeleteElementModal,
} from '@codelab/frontend/modules/element'
import { ComponentContext } from '@codelab/frontend/presenter/container'
import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import { refetchGetComponentElementsQuery } from '@codelab/shared/codegen/graphql'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { CreateComponentElementForm } from '../use-cases'

export const MainPaneComponentDetail = () => {
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
      <CrudModal
        entityType={EntityType.Element}
        actionType={ActionType.Create}
        okText={'Create'}
        renderForm={() => (
          <CreateComponentElementForm
            initialData={{ parentElementId: selectedElement?.id }}
          />
        )}
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
