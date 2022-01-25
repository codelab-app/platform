import { SelectComponent } from '../fields'
import { UiPropertiesFn } from '../types'

export const selectComponentUiProperties: UiPropertiesFn = () => ({
  uniforms: { component: SelectComponent },
})
