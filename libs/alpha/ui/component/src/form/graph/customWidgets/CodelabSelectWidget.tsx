import { asNumber, guessType } from '@rjsf/core/lib/utils'
import { Select } from 'antd'
import React from 'react'

const nums = new Set(['number', 'integer'])

const { Option } = Select

const SELECT_STYLE = {
  width: '99%',
}

const processValue = (schema, value) => {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema

  if (value === '') {
    return undefined
  }

  if (type === 'array' && items && nums.has(items.type)) {
    return value.map(asNumber)
  }

  if (type === 'boolean') {
    return value === 'true'
  }

  if (type === 'number') {
    return asNumber(value)
  }

  // If type is undefined, but an enum is present, try and infer the type from
  // the enum values
  if (schema.enum) {
    if (schema.enum.every((x) => guessType(x) === 'number')) {
      return asNumber(value)
    }

    if (schema.enum.every((x) => guessType(x) === 'boolean')) {
      return value === 'true'
    }
  }

  return value
}

const getValue = (event: any, multiple: any) => {
  if (multiple) {
    return (
      [].slice
        .call(event.target.options)
        // @ts-ignore
        .filter((o) => o.selected)
        // @ts-ignore
        .map((o) => o.value)
    )
  }

  return event.target.value
}

export const CodelabSelectWidget = (props: any) => {
  const {
    schema,
    formContext,
    id,
    options,
    value,
    // required,
    disabled,
    readonly,
    multiple,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    placeholder,
  } = props
  const { readonlyAsDisabled = true } = formContext

  const { enumOptions, enumDisabled } = options

  const handleChange = (nextValue) => onChange(processValue(schema, nextValue))

  const handleBlur = () => onBlur(id, processValue(schema, value))

  const handleFocus = () => onFocus(id, processValue(schema, value))

  const getPopupContainer = (node) => node.parentNode

  const stringify = (currentValue) =>
    Array.isArray(currentValue) ? value.map(String) : String(value)

  console.log(placeholder)

  return (
    <div>
      <Select
        autoFocus={autofocus}
        disabled={disabled || (readonlyAsDisabled && readonly)}
        getPopupContainer={getPopupContainer}
        id={id}
        mode={typeof multiple !== 'undefined' ? 'multiple' : undefined}
        onBlur={!readonly ? handleBlur : undefined}
        onChange={!readonly ? handleChange : undefined}
        onFocus={!readonly ? handleFocus : undefined}
        placeholder={placeholder}
        style={SELECT_STYLE}
        value={typeof value !== 'undefined' ? stringify(value) : undefined}
      >
        {enumOptions.map(({ value: optionValue, label: optionLabel }) => (
          <Option
            disabled={enumDisabled && enumDisabled.indexOf(optionValue) !== -1}
            key={String(optionValue)}
            value={String(optionValue)}
          >
            {optionLabel}
          </Option>
        ))}
      </Select>
      {/* <div style={{float: 'right'}}> */}
      {/*	<Tooltip placement="rightTop" title={schema.description}> */}
      {/*		<InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} /> */}
      {/*	</Tooltip> */}
      {/* </div> */}
    </div>
  )
}
