'use server'

import type {
  PreferenceOptions,
  PreferenceWhere,
} from '@codelab/shared/infra/gqlgen'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { type IPreferenceDto } from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/typebox'
import { preferenceServerActions } from '@codelab/shared-domain-module/preference'
import { revalidateTag } from 'next/cache'

const { GetPreferences } = preferenceServerActions

export const preferenceQuery = async (
  where?: PreferenceWhere,
  options?: PreferenceOptions,
): Promise<IPreferenceDto> => {
  const {
    items: [preference],
  } = await GetPreferences(
    {
      options,
      where,
    },
    { tags: [CACHE_TAGS.PREFERENCE] },
  )

  Validator.assertsDefined(preference)

  return preference
}

export const invalidateAppListQuery = async () =>
  revalidateTag(CACHE_TAGS.PREFERENCE)
