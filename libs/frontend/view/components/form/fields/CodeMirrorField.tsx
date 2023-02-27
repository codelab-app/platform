import isNil from 'lodash/isNil'
import type { Ref } from 'react'
import React from 'react'
import type { FieldProps } from 'uniforms'
import { connectField } from 'uniforms'
import { wrapField } from 'uniforms-antd'
import type { CodeMirrorEditorProps } from '../../codeMirror'
import { CodeMirrorEditor } from '../../codeMirror'

export type Value = string | number | boolean | undefined

export type MainPropsOnChange = (
  value: Value,
  uniformsOnChange: (value: Value) => void,
) => void

type CodeMirrorFieldProps = Omit<CodeMirrorEditorProps, 'onChange'> & {
  onChange: MainPropsOnChange
}

type CodeMirrorConnectFieldProps = FieldProps<
  Value,
  // omitting because it clashes with the default
  // FieldProps property and it will be overridden
  // anyways when merging the props
  Omit<CodeMirrorEditorProps, 'onReset'>,
  {
    inputRef?: Ref<HTMLDivElement>
  }
>

export const CodeMirrorField = (mainProps?: Partial<CodeMirrorFieldProps>) => {
  const Component = React.memo(
    connectField<CodeMirrorConnectFieldProps>(
      (baseProps) => {
        const merged = { ...mainProps, ...baseProps }

        const mainPropsOnChange = (value: Value) => {
          mainProps?.onChange && mainProps.onChange(value, baseProps.onChange)
        }

        const onChange = mainProps?.onChange
          ? mainPropsOnChange
          : baseProps.onChange

        /**
         * TODO: should interpret type
         * number should be read as number
         * currently, everything is interpreted as string
         */

        // Will show blank if undefined instead of "undefined" string
        const editorValue = !isNil(merged.value ?? merged.field?.default)
          ? String(merged.value ?? merged.field?.default)
          : undefined

        return wrapField(
          baseProps,
          <CodeMirrorEditor
            height="auto"
            maxHeight="150px"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...merged}
            onChange={onChange}
            value={editorValue}
          />,
        )
      },
      {
        kind: 'leaf',
      },
    ),
  )

  Component.displayName = 'CodeMirrorField'

  return Component
}
