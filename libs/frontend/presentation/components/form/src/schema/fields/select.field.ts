import type { FormItemProps } from 'antd'
import type { SelectFieldProps } from 'uniforms-antd'

import { SelectField } from 'uniforms-antd'

export const selectField = (
  props: Partial<SelectFieldProps & FormItemProps>,
) => ({
  uniforms: {
    ...props,
    component: SelectField,
    optionFilterProp: 'label',
    showSearch: true,
  },
})
