'use server'

import type {
  PreferenceOptions,
  PreferenceWhere,
} from '@codelab/shared/infra/gql'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { type IPreferenceDto } from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/schema'
import { revalidateTag } from 'next/cache'

import { GetPreferences } from './preference.api.graphql.gen'

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

export const invalidateAppListQuery = () => revalidateTag(CACHE_TAGS.PREFERENCE)
