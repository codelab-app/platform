import type { INodeType, IPreferenceDto } from '@codelab/shared/abstract/core'
import type {
  PreferenceOptions,
  PreferenceWhere,
} from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { PreferenceFragment } from '@codelab/shared/infra/gql'
import {
  preferenceApi,
  preferenceMapper,
} from '@codelab/shared-domain-module/preference'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PreferenceRepository extends AbstractRepository<
  INodeType.Preference,
  IPreferenceDto,
  PreferenceFragment,
  PreferenceWhere,
  PreferenceOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(preferences: Array<IPreferenceDto>) {
    const {
      createPreferences: { preferences: createdPreferences },
    } = await preferenceApi().CreatePreferences({
      input: preferences.map((preference) =>
        preferenceMapper.toCreateInput(preference),
      ),
    })

    return createdPreferences
  }

  protected async _find({
    options,
    where,
  }: {
    where?: PreferenceWhere
    options?: PreferenceOptions
  }) {
    const { items } = await preferenceApi().GetPreferences({
      options,
      where,
    })

    return items
  }

  protected async _update(preference: IPreferenceDto, where: PreferenceWhere) {
    const {
      updatePreferences: { preferences },
    } = await preferenceApi().UpdatePreferences({
      update: preferenceMapper.toUpdateInput(preference),
      where,
    })

    return preferences[0]
  }
}
