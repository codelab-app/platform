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
      allowClear={true}
      disabled={props.disabled}
      onChange={(v) => props.onChange(v)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      showAction={['focus', 'click']}
      value={props.value ?? ''}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...filterDOMProps(props)}
    />,
  )

export const AutoCompleteField = connectField<AutoCompleteFieldProps>(
  AutoCompleteInternal,
  { kind: 'leaf' },
)
