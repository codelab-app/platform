import React, { Ref } from 'react'
import { connectField, HTMLFieldProps } from 'uniforms'
import { MonacoEditor, MonacoEditorProps } from '../../editors/monaco'

export type MonacoFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLTextAreaElement> }
>

export const monacoFieldFactory = (
  monacoProps: Omit<MonacoEditorProps, 'value' | 'onChange'>,
) =>
  connectField<MonacoFieldProps>(
    (props) => {
      return (
        <>
          <p>{props.label ?? ''}</p>
          <MonacoEditor
            value={props.value as string}
            onChange={props.onChange as any}
            {...monacoProps}
          />
        </>
      )
    },
    {
      kind: 'leaf',
    },
  )
