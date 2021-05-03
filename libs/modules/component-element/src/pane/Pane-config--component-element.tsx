import { DeleteOutlined } from '@ant-design/icons'
import { useBuilderSelection } from '@codelab/frontend/builder'
import {
  ActionType,
  CrudModal,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { useGetComponentElementQuery } from '@codelab/hasura'
import { Empty, Spin } from 'antd'
import React from 'react'
import { CreateComponentLinkButton } from '../createComponentLink/CreateComponentLinkButton'
import { CreateComponentLinkForm } from '../createComponentLink/CreateComponentLinkForm'
import { DeleteComponentElementButton } from '../deleteComponentElement/DeleteComponentElementButton'
import { DeleteComponentElementForm } from '../deleteComponentElement/DeleteComponentElementForm'
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
        <UpdateComponentElementForm
          key={componentElementId}
          componentElement={element}
        />

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <CreateComponentLinkButton>
            Insert child element
          </CreateComponentLinkButton>
          <DeleteComponentElementButton
            componentElementId={element.id}
            icon={<DeleteOutlined />}
            danger={true}
          />
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
            <DeleteComponentElementForm
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
