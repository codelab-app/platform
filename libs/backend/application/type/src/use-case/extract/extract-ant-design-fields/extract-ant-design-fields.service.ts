import type { AntDesignField } from '@codelab/backend/abstract/core'
import { IAuthUseCase } from '@codelab/backend/abstract/types'
import {
  Field,
  FieldRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type { IAtomDTO, IFieldDTO } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import find from 'lodash/find'
import { v4 } from 'uuid'
import { AntdTypeAdapterService } from '../../type-adapter/antd-type-adapter/antd-type-adapter.service'
import { readAntDesignApis } from './read-ant-design-apis'

/**
 * Here we want to parse the CSV files from Ant Design and seed it as atoms
 *
 * We don't map the existing ids here
 */
export class ExtractAntDesignFieldsService extends IAuthUseCase<
  Array<IAtomDTO>,
  Array<IFieldDTO>
> {
  private antdDataFolder = `${process.cwd()}/data/antd-v5/`

  fieldRepository = new FieldRepository()

  /**
   * Extract data to be used for seeding, these data have already been mapped with correct ID for upsert
   */
  protected async _execute(atoms: Array<IAtomDTO>) {
    const antDesignApis = await readAntDesignApis(this.antdDataFolder)
    const fieldsByAtom = []

    for (const atom of atoms) {
      const antDesignApi = find(
        antDesignApis,
        (api) =>
          api.atom.name === atom.name.replace('AntDesign', '').toLowerCase(),
      )

      if (!antDesignApi) {
        continue
      }

      const fields = await this.transformFields(atom, antDesignApi.fields)
      fieldsByAtom.push(...fields)
    }

    return fieldsByAtom
  }

  private async transformFields(
    atom: IAtomDTO,
    atomFields: Array<AntDesignField>,
  ) {
    const result: Array<IFieldDTO> = []

    for (const field of atomFields) {
      const existingOrNewField = await this.createOrUpdateField(atom, field)

      if (existingOrNewField) {
        result.push(existingOrNewField)
      }
    }

    return result
  }

  private async createOrUpdateField(
    atom: IAtomDTO,
    field: AntDesignField,
  ): Promise<IFieldDTO | undefined> {
    const existingField = await this.fieldRepository.findOne({
      api: {
        id: atom.api.id,
      },
      key: field.property,
    })

    if (existingField) {
      return existingField
    }

    const fieldTypeDTO = await new AntdTypeAdapterService({
      atom,
      field: {
        key: field.property,
      },
      owner: this.owner,
    }).execute({ type: field.type })

    if (!fieldTypeDTO) {
      return undefined
    }

    const type = await TypeFactory.save(
      {
        ...fieldTypeDTO,
        owner: this.owner,
      },
      { name: fieldTypeDTO.name },
    )

    return Field.create({
      api: { id: atom.api.id },
      defaultValues: null,
      description: field.description,
      fieldType: type,
      id: v4(),
      key: field.property,
      name: compoundCaseToTitleCase(field.property),
    })
  }
}
