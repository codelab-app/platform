import { ExecuteCommandActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { ExecuteCommandInput } from '@codelab/shared/abstract/codegen'
import { AutoFields } from 'uniforms-antd'
import { executeCommandSchema } from './executeCommandSchema'
import { ExecuteCommandResponse } from './types'
import { useExecuteCommandForm } from './useExecuteCommandForm'

/**
 * Allows any string commands to be executed
 * @constructor
 */
export const ExecuteCommandModal = () => {
  const {
    onSubmit,
    actionType,
    onSubmitSuccess,
    onSubmitError,
    reset,
    isLoading,
  } = useExecuteCommandForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Execute Command"
      onCancel={reset}
      visible={actionType === ExecuteCommandActionType.Execute}
    >
      {({ submitRef }) => (
        <Form<ExecuteCommandInput, ExecuteCommandResponse>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={executeCommandSchema}
          submitRef={submitRef}
        >
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}
