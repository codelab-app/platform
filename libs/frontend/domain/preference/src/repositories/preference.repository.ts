import type {
  IPreferenceModel,
  IPreferenceRepository,
} from '@codelab/frontend/abstract/domain'
import type { IPreferenceDto, IRef } from '@codelab/shared/abstract/core'
import type {
  PreferenceOptions,
  PreferenceUniqueWhere,
  PreferenceWhere,
} from '@codelab/shared/infra/gql'

import { preferenceMapper } from '@codelab/shared/domain-old'
import { Validator } from '@codelab/shared/infra/schema'

import { Preference } from '../store/preference.model'
import {
  CreatePreferences,
  DeletePreferences,
  GetPreferences,
  UpdatePreferences,
} from './preference.api.graphql.gen'

export const preferenceRepository: IPreferenceRepository = {
  add: async (preference: IPreferenceDto) => {
    const {
      createPreferences: { preferences },
    } = await CreatePreferences({
      input: [preferenceMapper.toCreateInput(preference)],
    })

    const createdPreference = preferences[0]

    Validator.assertsDefined(createdPreference)

    return createdPreference
  },

  delete: async (preferences: Array<IPreferenceModel>) => {
    const {
      deletePreferences: { nodesDeleted },
    } = await DeletePreferences({
      delete: Preference.toDeleteInput(),
      where: { id_IN: preferences.map((preference) => preference.id) },
    })

    return nodesDeleted
  },

  find: async (where?: PreferenceWhere, options?: PreferenceOptions) => {
    return await GetPreferences({ options, where })
  },

  findOne: async (where: PreferenceUniqueWhere) => {
    return (await preferenceRepository.find(where)).items[0]
  },

  update: async ({ id }: IRef, preference: IPreferenceDto) => {
    const {
      updatePreferences: { preferences },
    } = await UpdatePreferences({
      update: preferenceMapper.toUpdateInput(preference),
      where: { id },
    })

    const updatedPreference = preferences[0]

    Validator.assertsDefined(updatedPreference)

    return updatedPreference
  },
}
