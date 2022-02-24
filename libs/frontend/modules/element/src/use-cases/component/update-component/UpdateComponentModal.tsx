import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { useComponentState } from '../../../hooks'
import { updateComponentSchema } from './createComponentSchema'
import { UpdateComponentInput } from './types'
import { useUpdateComponentForm } from './useUpdateComponentForm'

export const UpdateComponentModal = () => {
  const { actionType } = useComponentState()

  const { isLoading, onSubmit, onSubmitSuccess, onSubmitError, reset, model } =
    useUpdateComponentForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Update"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Update component</span>}
      visible={actionType === CRUDActionType.Update}
    >
      {({ submitRef }) => (
        <Form<UpdateComponentInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={updateComponentSchema}
          submitRef={submitRef}
        >
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}
