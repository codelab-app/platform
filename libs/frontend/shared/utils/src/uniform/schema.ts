import { singlySpacedTitleCaseWithNumbersRegex } from '@codelab/shared/utils'

export const showFieldOnDev = () => {
  if (process.env.NODE_ENV === 'development') {
    return {}
  }

  return {
    uniforms: {
      component: () => null,
    },
  }
}

export const hideField = {
  uniforms: {
    component: () => null,
  },
}

export const nonEmptyString = {
  type: 'string' as const,
  transform: ['trim'],
  minLength: 1,
}

export const titleCaseValidation = {
  pattern: singlySpacedTitleCaseWithNumbersRegex.source,
  errorMessage: 'must be in Title Case',
}
