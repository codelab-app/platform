'use client'

import {
  CodeMirrorEditor,
  type CodeMirrorEditorProps,
} from '@codelab/frontend-presentation-components-codemirror'
import { memo, type Ref } from 'react'
import { isNonNullish } from 'remeda'
import type { FieldProps } from 'uniforms'
import { connectField } from 'uniforms'
import { wrapField } from 'uniforms-antd'

export type Value = boolean | number | string | undefined

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
  const Component = memo(
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
        const editorValue = isNonNullish(merged.value ?? merged.field?.default)
          ? String(merged.value ?? merged.field?.default)
          : undefined

        return wrapField(
          baseProps,
          <CodeMirrorEditor
            height="auto"
            maxHeight="150px"
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
