import type { Override } from 'uniforms'

import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import { Button, Flex } from 'antd'
import { Form } from 'antd/lib'
import Tooltip from 'antd/lib/tooltip'
import styled from 'styled-components'

const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label {
    width: 100%;

    & > label {
      display: flex;

      &:after {
        width: 0px;
        height: 0px;
        margin: 0px;
        padding: 0px;
      }
    }
  }
`

export type FieldWrapperProps = Override<
  FormItemProps,
  {
    error?: unknown
    errorMessage?: string
    info?: string
    showInlineError?: boolean
    wrapperStyle?: ObjectLike
    isExpression: boolean
    toggle(): void
  }
>

export const FieldWrapper = ({
  children,
  colon,
  error,
  errorMessage,
  extra,
  help,
  id,
  info,
  isExpression,
  label,
  labelCol,
  required,
  showInlineError,
  toggle,
  validateStatus,
  wrapperCol,
  wrapperStyle,
}: FieldWrapperProps) => {
  const buttonTooltip = isExpression ? 'Set static value' : 'Set expression'

  const labelNode = Boolean(label) && (
    <Flex align="center" justify="space-between" style={{ width: '100%' }}>
      <div>
        {label}
        {Boolean(info) && (
          <span>
            &nbsp;
            <Tooltip title={info}>
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        )}
        {Boolean(colon) && <>&nbsp;:</>}
      </div>
      <Tooltip placement="left" title={buttonTooltip}>
        <Button onClick={toggle} type={isExpression ? 'primary' : 'default'}>
          JS
        </Button>
      </Tooltip>
    </Flex>
  )

  return (
    <StyledFormItem
      colon={false}
      extra={extra}
      hasFeedback
      help={help || (showInlineError && Boolean(error) && errorMessage)}
      htmlFor={id}
      label={labelNode}
      labelCol={labelCol}
      required={required}
      style={wrapperStyle}
      validateStatus={error ? 'error' : validateStatus}
      wrapperCol={wrapperCol}
    >
      {children}
    </StyledFormItem>
  )
}
