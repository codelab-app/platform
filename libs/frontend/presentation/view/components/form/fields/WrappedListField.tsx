/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { connectField } from 'uniforms'
import type { ListFieldProps } from 'uniforms-antd'
import { ListField, wrapField } from 'uniforms-antd'

// `label` here needs to be null so that if the array's items has nested fields (e.g. interface type)
// their labels will be displayed. This is based on the uniforms documentation for the `label` prop
// https://uniforms.tools/docs/api-fields/#common-props
// We have a custom component that will render the label for the array field
const WrappedListFieldInternal = (props: ListFieldProps) =>
  wrapField(
    props as Omit<ListFieldProps, 'onReset'>,
    <ListField {...props} label={null} />,
  )

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
