import { BaseDgraphFields, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { FieldDgraphFields } from './dgraph-field.model'
import {
  DgraphInterface,
  InterfaceDgraphFields,
} from './dgraph-interface.model'
import { FieldMapper } from './field.mapper'
import { Interface, interfaceSchema } from './interface.model'
import { ArrayTypeDgraphFields, DgraphArrayType, TypeMapper } from './types'

@Injectable()
export class InterfaceMapper
  implements IDgraphMapper<DgraphInterface, Interface>
{
  constructor(
    private fieldMapper: FieldMapper,
    private typeMapper: TypeMapper,
  ) {}

  async map(input: DgraphInterface) {
    DgraphInterface.Schema.parse(input)

    const newInterface = new Interface()

    newInterface.id = input[BaseDgraphFields.uid]
    newInterface.name = input[InterfaceDgraphFields.Name]

    newInterface.fieldCollection = {
      types: [],
      fields: [],
    }

    const inputFields = input[InterfaceDgraphFields.Fields]

    if (inputFields) {
      for (const dgraphField of inputFields) {
        const type = dgraphField[FieldDgraphFields.Type]

        newInterface.fieldCollection.types.push(await this.typeMapper.map(type))

        if (
          type[BaseDgraphFields.DgraphType][0] ===
          DgraphArrayType.Metadata.modelName
        ) {
          // If it's an array, make sure we add the generic type too
          newInterface.fieldCollection.types.push(
            await this.typeMapper.map(
              (type as DgraphArrayType)[ArrayTypeDgraphFields.Type],
            ),
          )
        }

        newInterface.fieldCollection.fields.push(
          await this.fieldMapper.map(dgraphField),
        )
      }
    }

    interfaceSchema.parse(newInterface)

    return newInterface
  }
}
