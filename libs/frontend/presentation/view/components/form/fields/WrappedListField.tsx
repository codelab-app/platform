/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { connectField } from 'uniforms'
import type { ListFieldProps } from 'uniforms-antd'
import { ListField, wrapField } from 'uniforms-antd'

const WrappedListFieldInternal = (props: ListFieldProps) =>
  wrapField(props as Omit<ListFieldProps, 'onReset'>, <ListField {...props} />)

/**
 * The same as uniforms-antd `ListField`, but wrapped with `wrapField`
 * to get the default features as the other fields. Note that by default
 * all other fields are wrapped except for ListField.
 */
export const WrappedListField = connectField<ListFieldProps>(
  WrappedListFieldInternal,
  {
    kind: 'leaf',
  },
)
