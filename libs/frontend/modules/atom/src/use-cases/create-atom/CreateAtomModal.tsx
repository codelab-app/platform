import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { AtomType, filterNotHookType } from '@codelab/shared/abstract/core'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { CreateAtomInput, createAtomSchema } from './createAtomSchema'
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
          <AutoFields omitFields={['type']} />
          <SelectField
            label="Type"
            name="type"
            optionFilterProp="label"
            options={atomTypeOptions}
            showSearch={true}
          />
        </Form>
      )}
    </FormModal>
  )
}
