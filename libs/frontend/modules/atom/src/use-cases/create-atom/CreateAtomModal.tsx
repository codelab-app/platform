import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { useGetTagGraphsQuery, useTagTree } from '@codelab/frontend/modules/tag'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { CreateAtomInput } from '@codelab/shared/abstract/codegen'
import { AtomType, filterNotHookType } from '@codelab/shared/abstract/core'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { createAtomSchema } from './createAtomSchema'
import TreeSelectField from './helpers/TreeSelectField'
import { useCreateAtomForm } from './useCreateAtomForm'

const atomTypeOptions = Object.keys(AtomType)
  .filter(filterNotHookType)
  .map((atomType) => ({
    label: atomType,
    value: atomType,
  }))

export const CreateAtomModal = () => {
  const {
    onSubmit,
    actionType,
    onSubmitSuccess,
    onSubmitError,
    reset,
    isLoading,
  } = useCreateAtomForm()

  const { data } = useGetTagGraphsQuery()
  const tagTree = useTagTree(data?.getTagGraphs)
  const tagTreesData = tagTree.getAntdTree()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Create Atom"
      onCancel={reset}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <Form<CreateAtomInput>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={createAtomSchema}
          submitRef={submitRef}
        >
          <AutoFields omitFields={['type', 'api', 'tags']} />
          <SelectField
            label="Type"
            name="type"
            optionFilterProp="label"
            options={atomTypeOptions}
            showSearch={true}
          />
          <TreeSelectField label="Tags" name="tags" treeData={tagTreesData} />
        </Form>
      )}
    </FormModal>
  )
}
