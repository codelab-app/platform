import type { AntDesignField } from '@codelab/backend/abstract/core'
import { IAuthUseCase, IUseCase } from '@codelab/backend/abstract/types'
import {
  atomTypeKeyByFileName,
  SeedAtomsService,
} from '@codelab/backend/application/atom'
import { AtomRepository } from '@codelab/backend/domain/atom'
import {
  Field,
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type {
  IAtomDTO,
  IAuth0Owner,
  IFieldDTO,
} from '@codelab/frontend/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'
import { TransformAntDesignTypesService } from '../transform-ant-design-types/transform-ant-design-types.service'

/**
 * Here we want to parse the CSV files from Ant Design and seed it as atoms
 *
 * We don't map the existing ids here
 */
export class SeedFieldService extends IAuthUseCase<Array<IFieldDTO>, void> {
  fieldRepository: FieldRepository = new FieldRepository()

  /**
   * Extract data to be used for seeding, these data have already been mapped with correct ID for upsert
   */
  async _execute(fields: Array<IFieldDTO>) {
    for await (const field of fields) {
      await this.fieldRepository.save(field, {
        // Save by composite key
        api: {
          id: field.api.id,
        },
        key: field.key,
      })
    }
  }
}
