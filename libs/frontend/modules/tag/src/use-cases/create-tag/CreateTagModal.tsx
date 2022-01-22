import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { CreateTagInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields, SelectField } from 'uniforms-antd'
import { useTagState } from '../../hooks'
import { useGetTagsQuery } from '../../store'
import { createTagSchema } from './createTagSchema'
import { DisplayIfNotRoot } from './DisplayIfNotRoot'
import { useCreateTagForm } from './useCreateTagForm'

export const CreateTagModal = () => {
  const { selectedTag } = useTagState()

  const {
    onSubmit,
    model,
    onSubmitError,
    onSubmitSuccess,
    actionType,
    reset,
    isLoading,
  } = useCreateTagForm(selectedTag?.toString())

  const { data } = useGetTagsQuery()

  const options = data?.getTags.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }))

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Create Tag"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Create tag</span>}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <Form<CreateTagInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={createTagSchema}
          submitRef={submitRef}
        >
          <AutoFields omitFields={['parentTagId']} />
          <DisplayIfNotRoot>
            <SelectField
              label="Parent Tag"
              name="parentTagId"
              optionFilterProp="label"
              options={options}
              required
              showSearch={true}
            />
          </DisplayIfNotRoot>
        </Form>
      )}
    </FormModal>
  )
}
