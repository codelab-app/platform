import type { IPreferenceDto } from '@codelab/shared/abstract/core'
import type {
  Preference,
  PreferenceOptions,
  PreferenceWhere,
} from '@codelab/shared/infra/gql'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { PreferenceFragment } from '@codelab/shared/infra/gql'
import {
  preferenceApi,
  preferenceMapper,
} from '@codelab/shared-domain-module/preference'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PreferenceRepository extends AbstractRepository<
  IPreferenceDto,
  PreferenceFragment,
  PreferenceWhere,
  PreferenceOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
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
