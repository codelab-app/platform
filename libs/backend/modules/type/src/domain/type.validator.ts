import {
  DgraphAtom,
  DgraphEntityType,
  DgraphField,
  DgraphInterfaceType,
  DgraphQueryBuilder,
  DgraphQueryField,
  DgraphRepository,
  DgraphType,
  isDgraphArrayType,
  isDgraphFieldType,
  isDgraphInterfaceType,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import {
  OverlyNestedTypeError,
  RecursiveTypeError,
} from '../application/errors'
import { TypeUnusedError } from '../application/errors/type-unused.error'
import { CreateTypeInput } from '../use-cases/type/create-type'
import { MAX_TYPE_DEPTH } from './constants'

export type QueryResult = DgraphType<any> & {
  '~api'?: [DgraphAtom]
  '~type'?: Array<DgraphField>
}

@Injectable()
export class TypeValidator {
  constructor(private dgraph: DgraphRepository) {}

  /**
   * Throws error
   * if the type doesn't exist
   */
  async typeExists(typeId: string) {
    return await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getOneOrThrow<QueryResult>(
        txn,
        this.createGetTypeQuery(typeId),
        () => {
          throw new Error('Type does not exist')
        },
      ),
    )
  }

  /**
   * Throws {@link TypeUnusedError} if the type is the api of an atom
   * @param typeOrTypeId the type id or the result of {@link typeExists}
   */
  async typeIsNotApiOfAtom(typeOrTypeId: string | QueryResult) {
    if (typeof typeOrTypeId === 'string') {
      typeOrTypeId = await this.typeExists(typeOrTypeId)
    }

    if (typeOrTypeId['~api']?.length && typeOrTypeId['~api'][0]) {
      throw new TypeUnusedError(undefined, typeOrTypeId['~api'][0].name)
    }
  }

  /**
   * Throws {@link TypeUnusedError} if the type is referenced in any fields
   * @param typeOrTypeId the type id or the result of {@link typeExists}
   */
  async typeIsNotReferencedInFields(typeOrTypeId: string | QueryResult) {
    if (typeof typeOrTypeId === 'string') {
      typeOrTypeId = await this.typeExists(typeOrTypeId)
    }

    if (typeOrTypeId['~type']?.length) {
      const fields = typeOrTypeId['~type'].filter((f) => isDgraphFieldType(f))

      if (fields.length) {
        throw new TypeUnusedError(fields.map((f) => `${f.name}`))
      }
    }
  }

  async validateCreateTypeInput({
    arrayType,
    enumType,
    primitiveType,
    interfaceType,
    lambdaType,
    elementType,
    componentType,
  }: CreateTypeInput) {
    this.singleInput([
      enumType,
      arrayType,
      interfaceType,
      primitiveType,
      lambdaType,
      elementType,
      componentType,
    ])

    if (arrayType) {
      await this.typeExists(arrayType.itemTypeId)
    }
  }

  /** Throws error if there are less or more than 1 input in the array */
  singleInput(inputs: Array<any>) {
    const numberOfTypeFields = inputs.filter((t) => !!t).length

    if (numberOfTypeFields < 1) {
      throw new Error('At least one type input must be provided')
    } else if (numberOfTypeFields > 1) {
      throw new Error('No more than one type input must be provided')
    }
  }

  /**
   * Checks if the id of type A is referenced anywhere, at any depth, inside type B
   *
   * Throws {@link OverlyNestedTypeError} if the type is too nested based on {@link MAX_TYPE_DEPTH}
   * Throws {@link RecursiveTypeError} if typeAId is referenced inside type B
   */
  notRecursive(typeAId: string, typeB: DgraphType<any>) {
    let itemCheckIteration = 0
    const queue: Array<DgraphType<any>> = [typeB]

    while (queue.length > 0) {
      const next = queue.shift()

      if (!next) {
        continue
      }

      if (next.uid === typeAId) {
        throw new RecursiveTypeError()
      }

      if (isDgraphArrayType(next)) {
        queue.push(next.itemType)
      } else if (isDgraphInterfaceType(next)) {
        queue.push(...(next as DgraphInterfaceType).fields?.map((f) => f.type))
      }

      itemCheckIteration++

      if (itemCheckIteration > MAX_TYPE_DEPTH) {
        throw new OverlyNestedTypeError()
      }
    }
  }

  private createGetTypeQuery(typeId: string) {
    /**
     * 	q(func: uid(typeId)) {
          uid
          dgraph.type
          expand(_all_)
          ~api {
            uid
            dgraph.type
            expand(_all_)
          }
          ~type {
            uid
            dgraph.type
            expand(_all_)
          }
        }
     */

    return new DgraphQueryBuilder()
      .addTypeFilterDirective(DgraphEntityType.Type)
      .setUidFunc(typeId)
      .addBaseFields()
      .addFields(
        new DgraphQueryField(`~api`).addBaseInnerFields().addExpandAll(),
        new DgraphQueryField(`~type`).addBaseInnerFields().addExpandAll(),
      )
      .addExpandAll((f) => f.addExpandAllRecursive(2))
  }
}
