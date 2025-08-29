'use client'

import { Union } from '@codelab/frontend-shared-utils'
import invariant from 'invariant'
import { createAutoField } from 'uniforms'

import { ExpressionBoolField } from './ExpressionBoolField'
import { ExpressionDateField } from './ExpressionDateField'
import { ExpressionListField } from './ExpressionListField'
import { ExpressionNestField } from './ExpressionNestField'
import { ExpressionNumField } from './ExpressionNumField'
import { ExpressionRadioField } from './ExpressionRadioField'
import { ExpressionSelectField } from './ExpressionSelectField'
import { ExpressionTextField } from './ExpressionTextField'
import { ExpressionUnionField } from './ExpressionUnionField'

export const ExpressionAutoField = createAutoField((props) => {
  if (props.component) {
    return props.component
  }

  if (props.options) {
    return props.checkboxes && props.fieldType !== Array
      ? ExpressionRadioField
      : ExpressionSelectField
  }

  switch (props.fieldType) {
    case Array:
      return ExpressionListField
    case Boolean:
      return ExpressionBoolField
    case Date:
      return ExpressionDateField
    case Number:
      return ExpressionNumField
    case Object:
      return ExpressionNestField
    case String:
      return ExpressionTextField
    case Union:
      return ExpressionUnionField
  }

  return invariant(false, 'Unsupported field type: %s', props.fieldType)
})
