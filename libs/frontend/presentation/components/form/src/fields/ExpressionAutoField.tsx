'use client'

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

export const ExpressionAutoField = createAutoField((props) => {
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
  }

  return invariant(false, 'Unsupported field type: %s', props.fieldType)
})
