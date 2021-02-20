import { InfoCircleOutlined } from '@ant-design/icons'
import { Input, InputNumber, Tooltip } from 'antd'
import React from 'react'

const INPUT_STYLE = {
  width: '100%',
}

export const CodelabTextWidget = (props: any) => {
  const {
    // autofocus,
    disabled,
    formContext,
    id,
    // label,
    onBlur,
    onChange,
    onFocus,
    options,
    placeholder,
    readonly,
    // required,
    schema,
    value,
  } = props

  console.log(props)
  const { readonlyAsDisabled = true } = formContext

  const handleNumberChange = (nextValue: any) => {
    onChange(nextValue)
  }

  const handleTextChange = ({ target }: any) =>
    onChange(target.value === '' ? options.emptyValue : target.value)

  const handleBlur = ({ target }: any) => onBlur(id, target.value)

  const handleFocus = ({ target }: any) => onFocus(id, target.value)

  return schema.type === 'number' || schema.type === 'integer' ? (
    <div>
      <InputNumber
        disabled={disabled || (readonlyAsDisabled && readonly)}
        id={id}
        name={id}
        onBlur={!readonly ? handleBlur : undefined}
        onChange={!readonly ? handleNumberChange : undefined}
        onFocus={!readonly ? handleFocus : undefined}
        placeholder={placeholder}
        style={INPUT_STYLE}
        type="number"
        value={value}
      />
      <Tooltip placement="rightTop" title={schema.description}>
        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
      </Tooltip>
    </div>
  ) : (
    <Input
      disabled={disabled || (readonlyAsDisabled && readonly)}
      id={id}
      name={id}
      // suffix={
      //   schema.description ? (
      //     <Tooltip placement="left" title={schema.description}>
      //       <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
      //     </Tooltip>
      //   ) : (
      //     ''
      //   )
      // }
      onBlur={!readonly ? handleBlur : undefined}
      onChange={!readonly ? handleTextChange : undefined}
      onFocus={!readonly ? handleFocus : undefined}
      placeholder={placeholder}
      style={INPUT_STYLE}
      type={options.inputType || 'text'}
      value={value}
    />
  )
}
