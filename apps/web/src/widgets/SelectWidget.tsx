import { utils } from '@rjsf/core'
import Select from 'antd/lib/select'
import React from 'react'

const { asNumber } = utils
const { guessType } = utils
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
  const { type } = schema
  const { items } = schema

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
  } // If type is undefined, but an enum is present, try and infer the type from
  // the enum values

  if (schema.enum) {
    if (
      schema.enum.every((x) => {
        return guessType(x) === 'number'
      })
    ) {
      return asNumber(value)
    }

    if (
      schema.enum.every((x) => {
        return guessType(x) === 'boolean'
      })
    ) {
      return value === 'true'
    }
  }

  return value
}

export const SelectWidget = (_ref: any) => {
  const { autofocus } = _ref
  const { disabled } = _ref
  const { formContext } = _ref
  const { id } = _ref
  const { multiple } = _ref
  const { onBlur } = _ref
  const { onChange } = _ref
  const { onFocus } = _ref
  const { options } = _ref
  const { placeholder } = _ref
  const { readonly } = _ref
  const { schema } = _ref
  const { value } = _ref
  const _formContext$readonly = formContext.readonlyAsDisabled
  const readonlyAsDisabled =
    _formContext$readonly === undefined ? true : _formContext$readonly
  const { enumOptions } = options
  const { enumDisabled } = options

  const handleChange = function handleChange(nextValue: any) {
    return onChange(processValue(schema, nextValue))
  }

  const handleBlur = function handleBlur() {
    return onBlur(id, processValue(schema, value))
  }

  const handleFocus = function handleFocus() {
    return onFocus(id, processValue(schema, value))
  }

  const getPopupContainer = function getPopupContainer(node: any) {
    return node.parentNode
  }

  const stringify = function stringify(currentValue: any) {
    return Array.isArray(currentValue) ? value.map(String) : String(value)
  }

  return /* #__PURE__ */ React.createElement(
    Select,
    {
      autoFocus: autofocus,
      disabled: disabled || (readonlyAsDisabled && readonly),
      getPopupContainer,
      id,
      mode: typeof multiple !== 'undefined' ? 'multiple' : undefined,
      showSearch: true,
      filterOption: true,
      dropdownMatchSelectWidth: false,
      onBlur: !readonly ? handleBlur : undefined,
      onChange: !readonly ? handleChange : undefined,
      onFocus: !readonly ? handleFocus : undefined,
      placeholder,
      style: SELECT_STYLE,
      value: typeof value !== 'undefined' ? stringify(value) : undefined,
    },
    enumOptions.map((_ref2: any) => {
      const optionValue = _ref2.value
      const optionLabel = _ref2.label

      return /* #__PURE__ */ React.createElement(
        Select.Option,
        {
          disabled: enumDisabled && enumDisabled.indexOf(optionValue) !== -1,
          key: String(optionValue),
          value: String(optionValue),
        },
        optionLabel,
      )
    }),
  )
}

SelectWidget.defaultProps = {
  formContext: {},
}
