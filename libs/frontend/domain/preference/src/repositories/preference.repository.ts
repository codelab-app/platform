import type {
  IPreferenceModel,
  IPreferenceRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  PreferenceOptions,
  PreferenceUniqueWhere,
  PreferenceWhere,
} from '@codelab/shared/infra/gql'

import { Validator } from '@codelab/shared/infra/schema'

import { Preference } from '../store/preference.model'
import {
  CreatePreferences,
  DeletePreferences,
  GetPreferences,
  UpdatePreferences,
} from './preference.api.graphql.gen'

export const preferenceRepository: IPreferenceRepository = {
  add: async (preference: IPreferenceModel) => {
    const {
      createPreferences: { preferences },
    } = await CreatePreferences({
      input: [preference.toCreateInput()],
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

  update: async (preference: IPreferenceModel) => {
    const {
      updatePreferences: { preferences },
    } = await UpdatePreferences({
      update: preference.toUpdateInput(),
      where: { id: preference.id },
    })

    const updatedPreference = preferences[0]

    Validator.assertsDefined(updatedPreference)

    return updatedPreference
  },
}
