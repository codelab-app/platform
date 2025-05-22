/* eslint-disable react/jsx-props-no-spreading */
'use client'

import type { Completion } from '@codemirror/autocomplete'
import type { AutoCompleteProps } from 'antd'
import type { FieldProps } from 'uniforms'
import type { ListFieldProps, SelectFieldProps } from 'uniforms-antd'

import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import { hasExpression } from '@codelab/shared-infra-eval'
import { Button, Form, Tooltip } from 'antd'
import { useState } from 'react'
import { isNullish } from 'remeda'
import { connectField } from 'uniforms'
import { BoolField, NumField, SelectField } from 'uniforms-antd'

import { WrappedListField } from './WrappedListField'

type InnerProps = Omit<AutoCompleteProps, 'onChange' | 'onSelect'>

type Value = boolean | number | string | Array<unknown> | undefined

interface CodeMirrorFieldProps {
  autocomplete?: Array<Completion>
  getBaseControl?(fieldProps: CodeMirrorConnectFieldProps): React.ReactNode
  onToggle?(
    value: boolean,
    props: CodeMirrorConnectFieldProps,
    lastValue?: Value,
  ): void
}

type CodeMirrorConnectFieldProps = FieldProps<Value, InnerProps> & {
  required?: boolean
}

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
    case 'array':
      return <WrappedListField {...(props as ListFieldProps)} />
    case 'boolean':
      return <BoolField {...(props as FieldProps<boolean, InnerProps>)} />
    case 'integer':
    case 'number':
      return (
        <NumField
          {...(props as FieldProps<number, InnerProps>)}
          decimal={fieldProps.field.type === 'number'}
        />
      )
    case 'string':
      return <SelectField {...(props as SelectFieldProps)} />
    default:
      return null
  }
}

const ToggleExpression = ({
  fieldProps,
  mainProps,
}: ToggleExpressionFieldProps) => {
  // Will show blank if undefined instead of "undefined" string
  const value = !isNullish(fieldProps.value ?? fieldProps.field?.default)
    ? String(fieldProps.value ?? fieldProps.field?.default)
    : undefined

  const isExpression = value && hasExpression(value)
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

  console.log(fieldProps, mainProps)

  return (
    <div className="relative w-full">
      <div style={{ position: 'absolute', right: 0, top: '-2px' }}>
        <Tooltip placement="left" title={toggleButtonTooltip}>
          <Button onClick={toggleControlClick} type={toggleButtonType}>
            JS
          </Button>
        </Tooltip>
      </div>
      <Form.Item
        htmlFor={fieldProps.id}
        label={fieldProps.label ? `${fieldProps.label} :` : ''}
        name={fieldProps.name}
        required={fieldProps.required}
      >
        {showExpressionEditor ? (
          <CodeMirrorEditor
            cssString={`
            display: block;
            margin-bottom: 12px;
          `}
            customOptions={mainProps.autocomplete || []}
            language={ICodeMirrorLanguage.Javascript}
            title={fieldProps.field.label}
            {...fieldProps}
            value={value}
          />
        ) : (
          BaseControl
        )}
      </Form.Item>
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
