/* eslint-disable react/jsx-props-no-spreading */
import { Input } from 'antd'
import React, { Ref } from 'react'
import { HTMLFieldProps } from 'uniforms'

export type GraphqlEditorFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLTextAreaElement> }
>

const { TextArea } = Input

export const GraphqlEditorField = () => <TextArea rows={4} />
