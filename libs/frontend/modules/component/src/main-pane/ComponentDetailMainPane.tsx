import { PageType } from '@codelab/frontend/model/state/router'
import { BuilderMainPane, useBuilder } from '@codelab/frontend/modules/builder'
import {
  CreateElementButton,
  DeleteElementModal,
} from '@codelab/frontend/modules/element'
import { ComponentContext } from '@codelab/frontend/presenter/container'
import { refetchGetComponentElementsQuery } from '@codelab/shared/codegen/graphql'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { CreateComponentElementModal } from '../use-cases/component-element/create-component-element/CreateComponentElementModal'

export const ComponentDetailMainPane = () => {
  const { tree, component } = useContext(ComponentContext)
  const router = useRouter()

  const {
    state: { selectedElement },
  } = useBuilder()

  return (
    <BuilderMainPane
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
    </BuilderMainPane>
  )
}
