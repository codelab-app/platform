import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { useGetTagGraphsQuery, useTagTree } from '@codelab/frontend/modules/tag'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { CreateAtomInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import TreeSelectField from '../create-atom/helpers/TreeSelectField'
import { updateAtomSchema } from './updateAtomSchema'
import { useUpdateAtomForm } from './useUpdateAtomForm'

export const UpdateAtomModal = () => {
  const {
    onSubmit,
    actionType,
    onSubmitSuccess,
    onSubmitError,
    model,
    isLoading,
    reset,
  } = useUpdateAtomForm()

  const { data } = useGetTagGraphsQuery()
  const tagTree = useTagTree(data?.getTagGraphs)
  const tagTreesData = tagTree.getAntdTree()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Update Atom"
      onCancel={reset}
      visible={actionType === CRUDActionType.Update}
    >
      {({ submitRef }) => (
        <Form<CreateAtomInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={updateAtomSchema}
          submitRef={submitRef}
        >
          <AutoFields omitFields={['api', 'tags']} />
          <TreeSelectField label="Tags" name="tags" treeData={tagTreesData} />
        </Form>
      )}
    </FormModal>
  )
}
