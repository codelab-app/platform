import {
  BaseDgraphFields,
  DeepPartial,
  IDgraphMapper,
  instanceOfDgraphModel,
} from '@codelab/backend'
import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { MAX_TYPE_DEPTH } from '../../constants'
import { OverlyNestedTypeError } from '../../errors'
import { DgraphField, DgraphFieldFields } from '../dgraph-field.model'
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
import { DgraphPrimitiveType, PrimitiveTypeMapper } from './primitive-type'
import { Type } from './type.model'

export interface TypeMapperContext {
  iteration?: number
}

/**
  InterfaceMapper should be in its own file, but putting it here was the only
  way that I found to resolve a circular reference webpack error
 */

/**
 * Converts a {@link DgraphInterface} to an {@link Interface}
 */
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
      throw new OverlyNestedTypeError()
    }

    const dgraphInterface = DgraphInterface.Schema.parse(input)
    const id = dgraphInterface[BaseDgraphFields.uid]
    const name = dgraphInterface[DgraphTypeFields.name]

    const visitFields = async (
      fields: Array<DgraphField> | null | undefined,
      iteration = 0,
    ): Promise<FieldCollection | undefined> => {
      if (iteration > MAX_TYPE_DEPTH) {
        throw new OverlyNestedTypeError()
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
          dgraphField[DgraphFieldFields.Type]

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

/**
 * Converts a {@link DgraphTypeUnion} to a {@link Type}
 */
@Injectable()
export class TypeMapper
  implements IDgraphMapper<DgraphTypeUnion, Type, TypeMapperContext>
{
  constructor(
    private primitiveTypeMapper: PrimitiveTypeMapper,
    private arrayTypeMapper: ArrayTypeMapper,
    private enumTypeMapper: EnumTypeMapper,
    @Inject(forwardRef(() => InterfaceMapper)) // forwardRef is needed because of circular dependancy
    private interfaceMapper: InterfaceMapper,
  ) {}

  async map(input: DeepPartial<DgraphType>, context?: TypeMapperContext) {
    if (instanceOfDgraphModel(input as any, DgraphArrayType)) {
      return this.arrayTypeMapper.map(input as DgraphArrayType)
    }

    if (instanceOfDgraphModel(input as any, DgraphEnumType)) {
      return this.enumTypeMapper.map(input as DgraphEnumType)
    }

    if (instanceOfDgraphModel(input as any, DgraphInterface)) {
      return this.interfaceMapper.map(
        input as DgraphInterface,
        context || { iteration: 0 },
      )
    }

    if (instanceOfDgraphModel(input as any, DgraphPrimitiveType)) {
      return this.primitiveTypeMapper.map(input as DgraphPrimitiveType)
    }

    throw new Error(
      "Can't map dgraph type, unrecognized type " +
        input[BaseDgraphFields.DgraphType],
    )
  }
}
