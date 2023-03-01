/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { connectField } from 'uniforms'
import type { ListFieldProps } from 'uniforms-antd'
import { ListField, wrapField } from 'uniforms-antd'

const WrappedListFieldInternal = (props: ListFieldProps) =>
  wrapField(props as Omit<ListFieldProps, 'onReset'>, <ListField {...props} />)

export const WrappedListField = connectField<ListFieldProps>(
  WrappedListFieldInternal,
  {
    kind: 'leaf',
  },
)
