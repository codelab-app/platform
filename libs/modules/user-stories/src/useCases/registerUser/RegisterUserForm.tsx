import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { useUser } from '../../store'
import { requestJsonSchema } from '@codelab/tools/generators/json-schema'

export const RegisterUserForm = ({
  formId,
  hasSubmitButton = true,
}: {
  formId?: string
  hasSubmitButton?: boolean
}) => {
  const user = useUser()

  console.log(user.state.value)

  const isLoading = user.state.value.guest.signingUp === 'isLoading'

  const onSubmit = ({ formData }: any) => {
    user.send({
      type: 'ON_SUBMIT',
      data: formData,
    })
  }
  const Form = withTheme(AntDTheme)

  return (
    <Form
      id={formId}
      schema={requestJsonSchema.definitions.RegisterUserRequest as JSONSchema7}
      uiSchema={{
        password: {
          'ui:widget': 'password',
        },
      }}
      // widgets={widgets}
      // formContext={formCtx}
      // onChange={filterOptions}
      onSubmit={onSubmit}
      // onError={log('errors')}
    />
    // <Form
    //   id={formId}
    //   name="basic"
    //   layout="vertical"
    //   initialValues={{ remember: true }}
    //   onFinish={onFinish}
    // >
    //   <Form.Item
    //     name="username"
    //     rules={[{ required: true, message: 'Please input your username!' }]}
    //   >
    //     <Input placeholder="Username" />
    //   </Form.Item>

    //   <Form.Item
    //     name="password"
    //     rules={[{ required: true, message: 'Please input your password!' }]}
    //   >
    //     <Input.Password placeholder="Password" />
    //   </Form.Item>

    //   {hasSubmitButton && (
    //     <Form.Item>
    //       <Button loading={isLoading} type="primary" htmlType="submit">
    //         Sign up
    //       </Button>
    //     </Form.Item>
    //   )}
    // </Form>
  )
}
