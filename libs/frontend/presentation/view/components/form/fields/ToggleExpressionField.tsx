/* eslint-disable react/jsx-props-no-spreading */
import { hasStateExpression } from '@codelab/frontend/shared/utils'
import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import type { AutoCompleteProps } from 'antd'
import { Button, Space, Tooltip } from 'antd'
import isNil from 'lodash/isNil'
import React, { useState } from 'react'
import { css } from 'styled-components'
import type { FieldProps } from 'uniforms'
import { connectField } from 'uniforms'
import type { ListFieldProps, SelectFieldProps } from 'uniforms-antd'
import { BoolField, NumField, SelectField } from 'uniforms-antd'
import { CodeMirrorEditor, createAutoCompleteOptions } from '../../codeMirror'
import { WrappedListField } from './WrappedListField'

type InnerProps = Omit<AutoCompleteProps, 'onChange' | 'onSelect'>

type Value = Array<unknown> | boolean | number | string | undefined

interface CodeMirrorFieldProps {
  getBaseControl?(fieldProps: CodeMirrorConnectFieldProps): React.ReactElement
  onToggle?(
    value: boolean,
    props: CodeMirrorConnectFieldProps,
    lastValue?: Value,
  ): void
}

type CodeMirrorConnectFieldProps = FieldProps<Value, InnerProps>

interface ToggleExpressionFieldProps {
  fieldProps: CodeMirrorConnectFieldProps
  mainProps: CodeMirrorFieldProps
}

const getBaseControl = (fieldProps: CodeMirrorConnectFieldProps) => {
  const fullFieldName = fieldProps.name

  // If an expression field is nested in form schema - need to drop parent object name since 'connectField' will prepend it again.
  // So if the property name is 'objectProp.nestedProp' - need to drop 'objectProp'.
  // Otherwise 'connectField' wrapper will prepend it and construct invalid name 'objectProp.objectProp.nestedProp'.
  // connectField does not add label to fields inside a ListField and the name must be empty so the name auto-generated
  // for the fields inside the ListField are correctly attached e.g. `defaultValues.0`, `defaultValues.1`
  const name = fieldProps.label
    ? fullFieldName.substring(fullFieldName.lastIndexOf('.') + 1)
    : null

  const props = { ...fieldProps, label: null, name }

  switch (fieldProps.field.type) {
    case 'boolean':
      return <BoolField {...(props as FieldProps<boolean, InnerProps>)} />
    case 'number':
    case 'integer':
      return (
        <NumField
          {...(props as FieldProps<number, InnerProps>)}
          decimal={fieldProps.field.type === 'number'}
        />
      )
    case 'string':
      return <SelectField {...(props as SelectFieldProps)} />
    case 'array':
      return <WrappedListField {...(props as ListFieldProps)} />
    default:
      return null
  }
}

const ToggleExpression = ({
  fieldProps,
  mainProps,
}: ToggleExpressionFieldProps) => {
  // Will show blank if undefined instead of "undefined" string
  const value = !isNil(fieldProps.value ?? fieldProps.field?.default)
    ? String(fieldProps.value ?? fieldProps.field?.default)
    : undefined

  const isExpression = value && hasStateExpression(value)
  const [showExpressionEditor, setShowExpressionEditor] = useState(isExpression)
  const [valueBeforeToggle, setValueBeforeToggle] = useState<Value>()

  const BaseControl =
    mainProps.getBaseControl?.(fieldProps) ?? getBaseControl(fieldProps)

  const toggleControlClick = () => {
    setShowExpressionEditor(!showExpressionEditor)

    mainProps.onToggle?.(!showExpressionEditor, fieldProps, valueBeforeToggle)

    setValueBeforeToggle(fieldProps.value)
  }

  const toggleButtonType = showExpressionEditor ? 'primary' : 'default'

  const toggleButtonTooltip = showExpressionEditor
    ? 'Set static value'
    : 'Set expression'

  return (
    <div className="ant-form-item">
      <Space className="mb-1 w-full justify-between">
        <label htmlFor={fieldProps.id}>{fieldProps.label ?? ''}</label>

        <Tooltip placement="left" title={toggleButtonTooltip}>
          <Button onClick={toggleControlClick} type={toggleButtonType}>
            JS
          </Button>
        </Tooltip>
      </Space>

      {showExpressionEditor ? (
        <CodeMirrorEditor
          cssString={`
            display: block;
            margin-bottom: 12px;
          `}
          customOptions={createAutoCompleteOptions({}, 'this')}
          language={ICodeMirrorLanguage.Javascript}
          {...fieldProps}
          value={value}
        />
      ) : (
        BaseControl
      )}
    </div>
  )
}

ToggleExpression.displayName = 'ToggleExpressionField'

/**
 * Uniforms custom field which toggles between simple field type and CoreMirror
 */
export const ToggleExpressionField = (mainProps: CodeMirrorFieldProps) =>
  connectField<CodeMirrorConnectFieldProps>(
    (fieldProps) => (
      <ToggleExpression fieldProps={fieldProps} mainProps={mainProps} />
    ),
    { kind: 'leaf' },
  )
