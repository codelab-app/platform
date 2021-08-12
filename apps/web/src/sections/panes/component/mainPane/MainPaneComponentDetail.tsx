import { PageType } from '@codelab/frontend/model/state/router'
import { useBuilder } from '@codelab/frontend/modules/builder'
import {
  ActionType,
  ComponentContext,
  CrudModal,
  EntityType,
  PageType,
} from '@codelab/frontend/shared'
import { CreateComponentElementForm } from '@codelab/modules/component'
import {
  CreateElementButton,
  DeleteElementModal,
} from '@codelab/frontend/modules/element'
import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import { refetchGetComponentElementsQuery } from '@codelab/shared/codegen/graphql'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { MainPaneBuilderTemplate } from '../../paneTemplates'

export const MainPaneComponentDetail = () => {
  const { tree, component } = useContext(ComponentContext)
  const router = useRouter()

  const {
    state: { selectedElement },
  } = useBuilder()

  return (
    <MainPaneBuilderTemplate
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
    </MainPaneBuilderTemplate>
  )
}
