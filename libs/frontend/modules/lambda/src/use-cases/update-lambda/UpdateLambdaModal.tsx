import { Form, FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateLambdaSchema } from './updateLambdaSchema'

export const UpdateLambdaModal = () => {
  return null
  // <FormModal
  //   okButtonProps={{ loading: isLoading }}
  //   okText="Update Lambda"
  //   onCancel={reset}
  //   visible={actionType === CRUDActionType.Update}
  // >
  //   {({ submitRef }) => (
  //     <Form<UpdateLambdaInput>
  //       model={model}
  //       onSubmit={onSubmit}
  //       onSubmitError={onSubmitError}
  //       onSubmitSuccess={onSubmitSuccess}
  //       schema={updateLambdaSchema}
  //       submitRef={submitRef}
  //     >
  //       <AutoFields />
  //     </Form>
  //   )}
  // </FormModal>
}
