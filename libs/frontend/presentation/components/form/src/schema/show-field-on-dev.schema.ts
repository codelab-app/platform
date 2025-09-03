import { hiddenField } from './fields/hidden.field'

export const showFieldOnDev = () =>
  process.env.NODE_ENV === 'development' ? {} : hiddenField
