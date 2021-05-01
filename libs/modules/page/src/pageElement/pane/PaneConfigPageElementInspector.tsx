import React from 'react'
import { UpdatePageElementForm } from '../updatePageElement'
import {
  ActionType,
  CrudModal,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Empty, Spin } from 'antd'
import { useGetPageElementQuery } from '@codelab/hasura'
import {
  DeletePageElementForm,
  DeletePageElementButton,
} from '../deletePageElement'
import { DeleteOutlined } from '@ant-design/icons'
import { useBuilderSelectionState } from '@codelab/frontend/builder'

interface Props {
  pageElementId: string
}

export const PaneConfigPageElementInspector = ({ pageElementId }: Props) => {
  const { resetSelected } = useBuilderSelectionState()
  const { reset } = useCRUDModalForm(EntityType.PageElement)

  const { data, loading } = useGetPageElementQuery({
    variables: {
      pageElementId,
    },
  })

  const element = data?.page_element_by_pk

  if (loading) {
    return <Spin />
  }

  if (element) {
    return (
      <>
        <UpdatePageElementForm key={pageElementId} pageElement={element} />

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/*<CreateLinkedPageElementButton>*/}
          {/*  Insert child element*/}
          {/*</CreateLinkedPageElementButton>*/}
          <DeletePageElementButton
            pageElementId={element.id}
            icon={<DeleteOutlined />}
            danger={true}
          />
        </div>

        <CrudModal
          modalProps={{
            className: 'delete-page-element-modal',
          }}
          entityType={EntityType.PageElement}
          actionType={ActionType.Delete}
          okText="Delete"
          renderForm={() => (
            <DeletePageElementForm
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
