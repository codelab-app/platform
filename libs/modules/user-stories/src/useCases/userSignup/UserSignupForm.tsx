import { Button, Form, Input } from 'antd'
import React from 'react'
import { useUser } from '../../store'

export const UserSignupForm = ({
  formId,
  hasSubmitButton = true,
}: {
  formId?: string
  hasSubmitButton?: boolean
}) => {
  const user = useUser()

  const isLoading = user.state.value.guest.signingUp === 'isLoading'

  const onFinish = (values: object) => {
    user.send({
      type: 'ON_SUBMIT',
      data: values,
    })
  }

  return (
    <Form
      id={formId}
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      {hasSubmitButton && (
        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}
