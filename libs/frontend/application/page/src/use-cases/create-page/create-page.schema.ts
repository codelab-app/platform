'use client'

import type { JSONSchemaType } from 'ajv'

import {
  appSchema,
  hiddenField,
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import {
  minLengthMsg,
  requiredMsg,
  titleCasePatternMsg,
} from '@codelab/frontend-shared-utils'
import {
  type IPageCreateFormData,
  IPageKind,
} from '@codelab/shared-abstract-core'

import { UrlPatternField } from '../../components'

export const createPageSchema: JSONSchemaType<IPageCreateFormData> = {
  properties: {
    ...idSchema(),
    ...appSchema,
    kind: {
      type: 'string',
      default: IPageKind.Regular,
      ...hiddenField,
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    urlPattern: {
      label: 'Deployed Page URL',
      // error messages are displayed as help so we need to use extra instead
      extra: 'Use / for "Home" page',
      uniforms: {
        component: UrlPatternField,
      },
      ...nonEmptyString,
    },
  },
  errors: {
    name: {
      required: requiredMsg('Page name'),
      minLength: minLengthMsg('Page name', 1),
      pattern: titleCasePatternMsg('Page name'),
    },
    urlPattern: {
      required: requiredMsg('Url Pattern'),
      minLength: minLengthMsg('Url Pattern', 1),
    },
  },
  required: ['name', 'app', 'urlPattern'],
  title: 'Create Page Input',
  type: 'object',
} as const
