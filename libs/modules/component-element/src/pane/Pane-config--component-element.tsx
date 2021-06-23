import { useGetComponentElementQuery } from '@codelab/codegen/hasura'
import { useBuilderSelection } from '@codelab/frontend/builder'
import {
  ActionType,
  CrudModal,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Empty, Spin } from 'antd'
import React from 'react'
import { CreateComponentLinkButton } from '../createComponentLink/CreateComponentLinkButton'
import { CreateComponentLinkForm } from '../createComponentLink/CreateComponentLinkForm'
import { DeleteComponentElementsButton } from '../deleteComponentElements/DeleteComponentElementsButton'
import { DeleteComponentElementsForm } from '../deleteComponentElements/DeleteComponentElementsForm'
import { UpdateComponentElementForm } from '../updateComponentElement/UpdateComponentElementForm'

interface Props {
  componentElementId: string
}

export const PaneConfigComponentElement = ({ componentElementId }: Props) => {
  const { resetSelected } = useBuilderSelection()
  const { reset } = useCRUDModalForm(EntityType.ComponentElement)

  const { data, loading } = useGetComponentElementQuery({
    variables: {
      componentElementId,
    },
  })

  const element = data?.component_element_by_pk

  if (loading) {
    return <Spin />
  }

  if (element) {
    return (
      <>
        <UpdateComponentElementForm key={componentElementId} />

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <CreateComponentLinkButton>
            Insert child element
          </CreateComponentLinkButton>
          <DeleteComponentElementsButton ids={[element.id]} disabled={false} />
        </div>

        <CrudModal
          modalProps={{
            className: 'create-linked-component-element-modal',
          }}
          entityType={EntityType.LinkedComponentElement}
          actionType={ActionType.Create}
          okText="Create"
          renderForm={() => (
            <CreateComponentLinkForm
              sourceComponentElementId={componentElementId}
            />
          )}
        />

        <CrudModal
          modalProps={{
            className: 'delete-component-element-modal',
          }}
          entityType={EntityType.ComponentElement}
          actionType={ActionType.Delete}
          okText="Delete"
          renderForm={() => (
            <DeleteComponentElementsForm
              onSubmitSuccess={() => {
                resetSelected()
                reset()
              }}
            />
          )}
        />
      </>
    )
  }

  return <Empty />
}
