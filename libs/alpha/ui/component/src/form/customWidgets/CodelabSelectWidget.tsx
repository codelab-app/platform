import { utils } from '@rjsf/core'
import Select from 'antd/lib/select'
import React from 'react'

const { asNumber, guessType } = utils

const SELECT_STYLE = {
  width: '100%',
}

const nums = new Set(['number', 'integer'])

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
const processValue = (schema: any, value: any) => {
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
    if (schema.enum.every((x: any) => guessType(x) === 'number')) {
      return asNumber(value)
    }

    if (schema.enum.every((x: any) => guessType(x) === 'boolean')) {
      return value === 'true'
    }
  }

  return value
}

export const CodelabSelectWidget = (props: any) => {
  const {
    autofocus,
    disabled,
    formContext,
    id,
    // label,
    multiple,
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

  const { readonlyAsDisabled = true } = formContext

  const { enumOptions, enumDisabled } = options

  const handleChange = (nextValue: any) =>
    onChange(processValue(schema, nextValue))

  const handleBlur = () => onBlur(id, processValue(schema, value))

  const handleFocus = () => onFocus(id, processValue(schema, value))

  const getPopupContainer = (node: any) => node.parentNode

  const stringify = (currentValue: any) =>
    Array.isArray(currentValue) ? value.map(String) : String(value)

  console.log(placeholder)

  return (
    <Select
      showSearch
      autoFocus={autofocus}
      disabled={disabled || (readonlyAsDisabled && readonly)}
      getPopupContainer={getPopupContainer}
      id={id}
      mode={typeof multiple !== 'undefined' ? 'multiple' : undefined}
      // @ts-ignore
      name={id}
      onBlur={!readonly ? handleBlur : undefined}
      onChange={!readonly ? handleChange : undefined}
      onFocus={!readonly ? handleFocus : undefined}
      placeholder={placeholder}
      style={SELECT_STYLE}
      value={typeof value !== 'undefined' ? stringify(value) : undefined}
    >
      {enumOptions.map(({ value: optionValue, label: optionLabel }) => (
        <Select.Option
          disabled={enumDisabled && enumDisabled.indexOf(optionValue) !== -1}
          key={String(optionValue)}
          value={String(optionValue)}
        >
          {optionLabel}
        </Select.Option>
      ))}
    </Select>
  )
}
