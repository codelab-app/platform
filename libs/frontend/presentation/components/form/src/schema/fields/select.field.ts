import type { SelectOption } from '@codelab/frontend-abstract-types'
import type { SelectProps } from 'antd'

import { SelectField } from 'uniforms-antd'

export const selectField = (
  options: Array<SelectOption>,
  mode?: SelectProps['mode'],
) => ({
  uniforms: {
    component: SelectField,
    options,
    mode,
    optionFilterProp: 'label',
    showSearch: true,
  },
})
