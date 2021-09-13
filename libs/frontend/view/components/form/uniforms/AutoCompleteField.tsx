import AutoComplete, { AutoCompleteProps } from 'antd/lib/auto-complete'
import { RefSelectProps } from 'antd/lib/select'
import React, { Ref } from 'react'
import { connectField, FieldProps, filterDOMProps } from 'uniforms'
import { wrapField } from 'uniforms-antd'

export type AutoCompleteFieldProps = FieldProps<
  string,
  AutoCompleteProps,
  { inputRef?: Ref<RefSelectProps> }
>

const AutoCompleteInternal = (props: AutoCompleteFieldProps) =>
  wrapField(
    props,
    <AutoComplete
      disabled={props.disabled}
      showAction={['focus', 'click']}
      allowClear={true}
      onChange={(v) => props.onChange(v)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />,
  )

export const AutoCompleteField = connectField<AutoCompleteFieldProps>(
  AutoCompleteInternal,
  { kind: 'leaf' },
)
