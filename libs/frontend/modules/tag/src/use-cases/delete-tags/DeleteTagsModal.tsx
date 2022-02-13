import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { DeleteTagsInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields, ListField } from 'uniforms-antd'
import { useGetTagsQuery } from '../../store'
import { deleteTagsSchema } from './deleteTagsSchema'
import { useDeleteTagForm } from './useDeleteTagsForm'

export const DeleteTagsModal = () => {
  const {
    onSubmit,
    actionType,
    entity,
    onSubmitSuccess,
    onSubmitError,
    reset,
    isLoading,
    model,
  } = useDeleteTagForm()

  const { data } = useGetTagsQuery()
  const deleteIds = model?.ids

  const deleteTags = data?.tags
    .filter((tag) => deleteIds?.includes(tag.id))
    .map((tag) => tag.name)
    .sort()

  return (
    <FormModal
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Delete Tags"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Delete tags</span>}
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => (
        <Form<DeleteTagsInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={deleteTagsSchema}
          submitRef={submitRef}
        >
          Are you sure you want to delete {deleteTags?.join(', ')}?
          <AutoFields omitFields={['ids']} />
          <ListField hidden={true} itemProps={{}} name="ids" />
        </Form>
      )}
    </FormModal>
  )
}
