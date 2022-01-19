import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { CreateComponentInput } from '@codelab/shared/abstract/codegen'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { useComponentState } from '../../../hooks'
import { createComponentSchema } from './createComponentSchema'
import { useCreateComponentForm } from './useCreateComponentForm'

export const CreateComponentModal = () => {
  const { actionType } = useComponentState()

  const { isLoading, onSubmit, onSubmitSuccess, onSubmitError, reset } =
    useCreateComponentForm()

  return (
    <FormModal
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Create"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Create component</span>}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <Form<CreateComponentInput>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={createComponentSchema}
          submitRef={submitRef}
        >
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}
