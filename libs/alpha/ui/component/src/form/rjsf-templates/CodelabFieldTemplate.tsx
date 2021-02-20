import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import Form from 'antd/lib/form'
import React from 'react'
import { WrapIfAdditional } from './WrapIfAdditional'

const VERTICAL_LABEL_COL = { span: 24 }
const VERTICAL_WRAPPER_COL = { span: 24 }

export const CodelabFieldTemplate = (props: any) => {
  const {
    children,
    classNames,
    description,
    disabled,
    displayLabel,
    // errors,
    // fields,
    formContext,
    help,
    hidden,
    id,
    label,
    onDropPropertyClick,
    onKeyChange,
    rawDescription,
    rawErrors,
    rawHelp,
    readonly,
    required,
    schema,
    // uiSchema,
  } = props
  // console.log(props)

  const {
    colon,
    labelCol = VERTICAL_LABEL_COL,
    wrapperCol = VERTICAL_WRAPPER_COL,
    wrapperStyle,
  } = formContext

  if (hidden) {
    return <div className="field-hidden">{children}</div>
  }

  const renderFieldErrors = () =>
    [...new Set(rawErrors)].map((error: any) => (
      <div key={`field-${id}-error-${error}`}>{error}</div>
    ))

  return (
    <WrapIfAdditional
      classNames={classNames}
      disabled={disabled}
      formContext={formContext}
      id={id}
      // label={label}
      onDropPropertyClick={onDropPropertyClick}
      onKeyChange={onKeyChange}
      readonly={readonly}
      required={required}
      schema={schema}
    >
      {id === 'root' ? (
        children
      ) : (
        <Form.Item
          colon={colon}
          // extra={!!rawDescription && description}
          hasFeedback={schema.type !== 'array' && schema.type !== 'object'}
          help={(!!rawHelp && help) || (!!rawErrors && renderFieldErrors())}
          htmlFor={id}
          label={
            <div>
              {schema.description && displayLabel ? (
                <Tooltip placement="right" title={schema.description}>
                  {displayLabel && label}{' '}
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              ) : (
                displayLabel && label
              )}
            </div>
          }
          labelCol={labelCol}
          required={required}
          style={wrapperStyle}
          validateStatus={rawErrors ? 'error' : undefined}
          wrapperCol={wrapperCol}
        >
          {children}
        </Form.Item>
      )}
    </WrapIfAdditional>
  )
}
