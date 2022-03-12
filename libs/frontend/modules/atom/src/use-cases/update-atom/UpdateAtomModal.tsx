import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { useGetTagGraphsQuery, useTagTree } from '@codelab/frontend/modules/tag'
import { Form, FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { TreeSelectField } from '../components'
import { CreateAtomInputSchema } from '../create-atom'
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

  const tagModel = model.tags as Array<string>
  const { data } = useGetTagGraphsQuery()
  const tagTree = useTagTree(data?.tagGraphs)
  const tagTreeData = tagTree.getAntdTrees()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Update Atom"
      onCancel={reset}
      visible={actionType === CRUDActionType.Update}
    >
      {({ submitRef }) => (
        <Form<CreateAtomInputSchema>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={updateAtomSchema}
          submitRef={submitRef}
        >
          <AutoFields omitFields={['tags']} />
          <TreeSelectField
            label="Tags"
            name="tags"
            treeData={tagTreeData}
            value={tagModel}
          />
        </Form>
      )}
    </FormModal>
  )
}
