import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { MAX_TYPE_DEPTH } from '../../constants'
import { DgraphField, FieldDgraphFields } from '../dgraph-field.model'
import {
  DgraphInterface,
  InterfaceDgraphFields,
} from '../dgraph-interface.model'
import { FieldMapper } from '../field.mapper'
import { FieldCollection, Interface, interfaceSchema } from '../interface.model'
import { DgraphTypeUnion } from './allDgraphTypes'
import {
  ArrayTypeDgraphFields,
  ArrayTypeMapper,
  DgraphArrayType,
} from './array-type'
import { DgraphType, DgraphTypeFields } from './dgraph-type.model'
import { DgraphEnumType, EnumTypeMapper } from './enum-type'
import { DgraphSimpleType, SimpleTypeMapper } from './simple-type'
import { Type } from './type.model'

export interface TypeMapperContext {
  iteration?: number
}

// This should be in its own file, but putting it here was the only
// way that I found to resolve a circular reference webpack error
@Injectable()
export class InterfaceMapper<TTypeMapper extends TypeMapper = TypeMapper>
  implements IDgraphMapper<DgraphInterface, Interface, TypeMapperContext>
{
  constructor(
    @Inject(forwardRef(() => FieldMapper))
    private fieldMapper: FieldMapper,
    @Inject(forwardRef(() => TypeMapper))
    private typeMapper: TTypeMapper,
  ) {}

  async map(
    input: DeepPartial<DgraphInterface>,
    context?: TypeMapperContext,
  ): Promise<Interface> {
    if (context && context.iteration && context.iteration > MAX_TYPE_DEPTH) {
      throw new Error('Type too nested')
    }

    const dgraphInterface = DgraphInterface.Schema.parse(input)
    const id = dgraphInterface[BaseDgraphFields.uid]
    const name = dgraphInterface[DgraphTypeFields.name]

    const visitFields = async (
      fields: Array<DgraphField> | null | undefined,
      iteration = 0,
    ): Promise<FieldCollection | undefined> => {
      if (iteration > MAX_TYPE_DEPTH) {
        throw new Error('Type too nested')
      }

      if (!fields) {
        return undefined
      }

      const fieldCollection: FieldCollection = {
        types: [],
        fields: [],
      }

      const typesById = new Map<string, DgraphType>()

      for (const dgraphField of fields) {
        let type: DgraphType | { uid: string } | undefined =
          dgraphField[FieldDgraphFields.Type]

        if (!(type as DgraphType)[BaseDgraphFields.DgraphType]) {
          type = typesById.get(type.uid)
        }

        if (!type || !(type as DgraphType)[BaseDgraphFields.DgraphType]) {
          throw new Error('Type not found')
        }

        const parsedType = type as DgraphType

        fieldCollection.types.push(
          await this.typeMapper.map(parsedType, {
            iteration: (context?.iteration || 0) + 1,
          }),
        )

        const dgraphType = parsedType[BaseDgraphFields.DgraphType][0]

        if (dgraphType === DgraphArrayType.Metadata.modelName) {
          // If it's an array, make sure we add the generic type too
          fieldCollection.types.push(
            await this.typeMapper.map(
              (parsedType as DgraphArrayType)[ArrayTypeDgraphFields.Type],
            ),
          )
        } else if (dgraphType === DgraphInterface.Metadata.modelName) {
          // If it's an interface, get all field types too
          // don't add the fields, because we can get them easily through the Interface
          // but if we need the types, it becomes a recursive query, so add them in the
          // flattened array
          const intface = parsedType as DgraphInterface

          const nestedFc = await visitFields(
            intface[InterfaceDgraphFields.Fields],
            iteration + 1,
          )

          if (nestedFc) {
            fieldCollection.types.push(...nestedFc.types)
          }
        }

        fieldCollection.fields.push(await this.fieldMapper.map(dgraphField))
      }

      return fieldCollection
    }

    const inputFields = dgraphInterface[InterfaceDgraphFields.Fields]
    const fieldCollection = await visitFields(inputFields)
    const newInterface = new Interface(id, name, fieldCollection)
    interfaceSchema.parse(newInterface)

    return newInterface
  }
}

@Injectable()
export class TypeMapper
  implements IDgraphMapper<DgraphTypeUnion, Type, TypeMapperContext>
{
  constructor(
    private simpleTypeMapper: SimpleTypeMapper,
    private arrayTypeMapper: ArrayTypeMapper,
    private enumTypeMapper: EnumTypeMapper,
    @Inject(forwardRef(() => InterfaceMapper))
    private interfaceMapper: InterfaceMapper,
  ) {}

  async map(input: DeepPartial<DgraphType>, context?: TypeMapperContext) {
    const dgraphTypeArray = input[BaseDgraphFields.DgraphType]

    if (!dgraphTypeArray || !dgraphTypeArray[0]) {
      throw new Error("Can't map dgraph type without the field dgraph.type")
    }

    const dgraphType = dgraphTypeArray[0]

    switch (dgraphType) {
      case 'ArrayType':
        return this.arrayTypeMapper.map(input as DgraphArrayType)
      case 'EnumType':
        return this.enumTypeMapper.map(input as DgraphEnumType)
      case 'Interface':
        return this.interfaceMapper.map(
          input as DgraphInterface,
          context || { iteration: 0 },
        )
      case 'SimpleType':
        return this.simpleTypeMapper.map(input as DgraphSimpleType)
      default:
        throw new Error(
          "Can't map dgraph type, unrecognized type " + dgraphType,
        )
    }
  }
}
