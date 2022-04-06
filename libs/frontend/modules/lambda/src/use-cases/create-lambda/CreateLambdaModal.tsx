import { Form, FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { createLambdaSchema } from './createLambdaSchema'

export const CreateLambdaModal = () => {
  return null
  // <FormModal
  //   okButtonProps={{ loading: isLoading }}
  //   okText="Create Lambda"
  //   onCancel={reset}
  //   visible={actionType === CRUDActionType.Create}
  // >
  //   {({ submitRef }) => (
  //     <Form<CreateLambdaInput>
  //       model={model}
  //       onSubmit={onSubmit}
  //       onSubmitError={onSubmitError}
  //       onSubmitSuccess={onSubmitSuccess}
  //       schema={createLambdaSchema}
  //       submitRef={submitRef}
  //     >
  //       <AutoFields />
  //     </Form>
  //   )}
  // </FormModal>
}
