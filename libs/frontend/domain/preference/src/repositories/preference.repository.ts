import type {
  IPreferenceModel,
  IPreferenceRepository,
} from '@codelab/frontend-abstract-domain'
import type { IPreferenceDto, IRef } from '@codelab/shared-abstract-core'
import type {
  PreferenceOptions,
  PreferenceWhere,
} from '@codelab/shared-infra-gqlgen'

import {
  preferenceMapper,
  preferenceServerActions,
} from '@codelab/shared-domain-module-preference'
import { Validator } from '@codelab/shared-infra-typebox'

import { Preference } from '../store/preference.model'

const {
  CreatePreferences,
  DeletePreferences,
  GetPreferences,
  UpdatePreferences,
} = preferenceServerActions

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

  // FIXME: make a unique where
  findOne: async (where: PreferenceWhere) => {
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
