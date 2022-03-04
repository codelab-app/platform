import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { useGetTagGraphsQuery, useTagTree } from '@codelab/frontend/modules/tag'
import { ModalForm } from '@codelab/frontend/view/components'
import { AtomType, filterNotHookType } from '@codelab/shared/abstract/core'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { TreeSelectField } from '../components'
import { CreateAtomInputSchema, createAtomSchema } from './createAtomSchema'
import { useCreateAtomForm } from './useCreateAtomForm'

const atomTypeOptions = Object.keys(AtomType)
  .filter(filterNotHookType)
  .map((atomType) => ({
    label: atomType,
    value: atomType,
  }))

export const CreateAtomModal = () => {
  const { onSubmit, actionType, onSubmitSuccess, onSubmitError, reset } =
    useCreateAtomForm()

  const { data } = useGetTagGraphsQuery()
  const tagTree = useTagTree(data?.tagGraphs)
  const tagTreeData = tagTree.getAntdTrees()

  return (
    <ModalForm.Modal
      okText="Create Atom"
      onCancel={reset}
      visible={actionType === CRUDActionType.Create}
    >
      <ModalForm.Form<CreateAtomInputSchema>
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={onSubmitSuccess}
        schema={createAtomSchema}
      >
        <AutoFields omitFields={['tags']} />
        <TreeSelectField label="Tags" name="tags" treeData={tagTreeData} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}
