'use client'

import type { AutoCompleteProps } from 'antd/lib/auto-complete'
import type { RefSelectProps } from 'antd/lib/select'
import type { Ref } from 'react'
import type { FieldProps } from 'uniforms'

import AutoComplete from 'antd/lib/auto-complete'
import { connectField, filterDOMProps } from 'uniforms'
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
      onChange={(value) => {
        props.onChange(value)
      }}
      placeholder={props.placeholder}
      ref={props.inputRef}
      showAction={['focus', 'click']}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />,
  )

export const AutoCompleteField = connectField<AutoCompleteFieldProps>(
  AutoCompleteInternal,
  { kind: 'leaf' },
)
