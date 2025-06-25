'use server'

import type {
  PreferenceOptions,
  PreferenceWhere,
} from '@codelab/shared-infra-gqlgen'

import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { type IPreferenceDto } from '@codelab/shared-abstract-core'
import { preferenceServerActions } from '@codelab/shared-domain-module-preference'
import { Validator } from '@codelab/shared-infra-typebox'
import { revalidateTag } from 'next/cache'
import { v4 } from 'uuid'
import { NextTracingOptions } from '@codelab/shared-abstract-types'

const { GetPreferences } = preferenceServerActions

export const preferenceQuery = async (
  where?: PreferenceWhere,
  options?: PreferenceOptions,
  tracing?: NextTracingOptions,
): Promise<IPreferenceDto> => {
  const {
    items: [preference],
  } = await GetPreferences(
    {
      options,
      where,
    },
    {
      tags: [CACHE_TAGS.Preference.all()],
      tracing: {
        operationId: 'preference-query',
        requestId: v4(),
        attributes: tracing?.attributes,
      },
    },
  )

  Validator.assertsDefined(preference)

  return preference
}

export const invalidateAppListQuery = async () =>
  revalidateTag(CACHE_TAGS.Preference.all())
