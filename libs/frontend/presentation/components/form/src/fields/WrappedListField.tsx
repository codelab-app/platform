/* eslint-disable react/jsx-props-no-spreading */

import type { ListFieldProps } from 'uniforms-antd'

import { ListField, wrapField } from 'uniforms-antd'

// `label` here needs to be null so that if the array's items has nested fields (e.g. interface type)
// their labels will be displayed. This is based on the uniforms documentation for the `label` prop
// https://uniforms.tools/docs/api-fields/#common-props
// We have a custom component that will render the label for the array field
export const WrappedListField = (props: Omit<ListFieldProps, 'onReset'>) => {
  return wrapField(props, <ListField {...props} label={null} />)
}
