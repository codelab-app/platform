import type {
  Preference,
  PreferenceOptions,
  PreferenceWhere,
} from '@codelab/backend/abstract/codegen'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  OgmService,
  preferenceSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IPreferenceDto } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PreferenceRepository extends AbstractRepository<
  IPreferenceDto,
  Preference,
  PreferenceWhere,
  PreferenceOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(preferences: Array<IPreferenceDto>) {
    return (
      await (
        await this.ogmService.Preference
      ).create({
        input: preferences.map(
          ({ builderBreakpoint, builderWidth, id, owner }) => ({
            builderBreakpoint,
            builderWidth,
            id,
            owner: connectOwner(owner),
          }),
        ),
        selectionSet: `{ preferences { ${preferenceSelectionSet} } }`,
      })
    ).preferences
  }

  protected async _find({
    options,
    where,
  }: {
    where?: PreferenceWhere
    options?: PreferenceOptions
  }) {
    return await (
      await this.ogmService.Preference
    ).find({
      options,
      selectionSet: `{ ${preferenceSelectionSet} }`,
      where,
    })
  }

  protected async _update(
    { builderBreakpoint, builderWidth }: IPreferenceDto,
    where: PreferenceWhere,
  ) {
    return (
      await (
        await this.ogmService.Preference
      ).update({
        update: {
          builderBreakpoint,
          builderWidth,
        },
        where,
      })
    ).preferences[0]
  }
}
