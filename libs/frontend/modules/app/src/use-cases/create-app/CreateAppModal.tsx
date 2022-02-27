import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { useUserState } from '@codelab/frontend/modules/user'
import { Form, FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { createAppSchema } from './createAppSchema'
import { CreateAppInput } from './types'
import { useCreateAppForm } from './useCreateAppForm'

export const CreateAppModal = () => {
  const {
    onSubmit,
    onSubmitSuccess,
    onSubmitError,
    reset,
    isLoading,
    actionType,
  } = useCreateAppForm()

  const { user } = useUserState()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Create App"
      onCancel={() => reset()}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <Form<CreateAppInput>
          model={{ owner: user.auth0Id }}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={createAppSchema}
          submitRef={submitRef}
        >
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}
