import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { CreateAtomInput } from '@codelab/shared/abstract/codegen'
import { AtomType, filterNotHookType } from '@codelab/shared/abstract/core'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { useAtomState } from '../../hooks'
import { createAtomSchema } from './createAtomSchema'
import { useCreateAtomForm } from './useCreateAtomForm'

const atomTypeOptions = Object.keys(AtomType)
  .filter(filterNotHookType)
  .map((atomType) => ({
    label: atomType,
    value: atomType,
  }))

export const CreateAtomModal = () => {
  const { actionType } = useAtomState()

  const { onSubmit, onSubmitSuccess, onSubmitError, reset, isLoading } =
    useCreateAtomForm()

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
          <AutoFields omitFields={['type', 'api']} />
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
