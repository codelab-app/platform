/* eslint-disable react/jsx-props-no-spreading */
import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import { css } from '@emotion/react'
import { AutoCompleteProps, Button, Space, Tooltip } from 'antd'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { connectField, FieldProps } from 'uniforms'
import {
  BoolField,
  ListField,
  ListFieldProps,
  NumField,
  SelectField,
  SelectFieldProps,
} from 'uniforms-antd'
import { CodeMirrorEditor, createAutoCompleteOptions } from '../../codeMirror'
import { useFormContext } from '../providers'

type InnerProps = Omit<AutoCompleteProps, 'onChange' | 'onSelect'>

type Value = string | number | boolean | undefined | Array<unknown>

interface CodeMirrorFieldProps {
  onToggle?: (
    value: boolean,
    props: CodeMirrorConnectFieldProps,
    lastValue?: Value,
  ) => void
}

type CodeMirrorConnectFieldProps = FieldProps<Value, InnerProps>

interface ToggleExpressionFieldProps {
  mainProps: CodeMirrorFieldProps
  fieldProps: CodeMirrorConnectFieldProps
}

const getBaseControl = (fieldProps: CodeMirrorConnectFieldProps) => {
  const props = { ...fieldProps, label: null }

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
      return <ListField {...(props as ListFieldProps)} />
    default:
      return null
  }
}

const ToggleExpression = ({
  mainProps,
  fieldProps,
}: ToggleExpressionFieldProps) => {
  const { allowExpressions, appStore } = useFormContext()
  const value = String(fieldProps.value ?? fieldProps.field.default)
  const isExpression = appStore?.getByExpression(value) !== value
  const [showExpressionEditor, setShowExpressionEditor] = useState(isExpression)
  const [valueBeforeToggle, setValueBeforeToggle] = useState<Value>()
  const BaseControl = getBaseControl(fieldProps)

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
      <Space css={tw`mb-1 justify-between w-full`}>
        <label htmlFor={fieldProps.id}>{fieldProps.label ?? ''}</label>

        <Tooltip placement="left" title={toggleButtonTooltip}>
          <Button
            hidden={!allowExpressions}
            onClick={toggleControlClick}
            type={toggleButtonType}
          >
            JS
          </Button>
        </Tooltip>
      </Space>

      <div>
        {showExpressionEditor && appStore ? (
          <CodeMirrorEditor
            customOptions={createAutoCompleteOptions(
              appStore.state.values,
              'this',
            )}
            language={ICodeMirrorLanguage.Javascript}
            overrideStyles={css`
              display: block;
            `}
            {...fieldProps}
            value={value}
          />
        ) : (
          BaseControl
        )}
      </div>
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
