import {
  DgraphEntityType,
  DgraphRepository,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import { TypeId, TypeKind } from '@codelab/shared/abstract/core'
import { Entity } from '@codelab/shared/abstract/types'
import { TypeTree } from '@codelab/shared/core'
import { Inject, Injectable } from '@nestjs/common'
import { RecursiveTypeError } from '../application/errors'
import { TypeUnusedError } from '../application/errors/type-unused.error'
import { CreateTypeInput } from '../use-cases/type/create-type'

@Injectable()
export class TypeValidator {
  constructor(
    private dgraph: DgraphRepository,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  /**
   * Throws error
   * if the type doesn't exist
   */
  async typeExists(typeId: TypeId) {
    return await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getOneOrThrowNamed<QueryResult>(
        txn,
        TypeValidator.createGetTypeQuery(typeId),
        'query',
        () => {
          throw new Error('Type does not exist')
        },
      ),
    )
  }

  /**
   * Require that any primitive cannot be created a second time
   *
   * We query for primitive types only first, then check the kind. If it already exists, we don't allow creation
   */
  async primitiveIsNotDuplicated(request: CreateTypeInput): Promise<void> {
    if (request.typeKind !== TypeKind.PrimitiveType) {
      return
    }

    const results = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.executeNamedQuery<Array<any>>(
        txn,
        `{
          query(func: eq(dgraph.type, ${DgraphEntityType.Type})) @filter(eq(typeKind, "${TypeKind.PrimitiveType}") AND eq(primitiveKind, ${request.primitiveType?.primitiveKind})) {
            uid
            primitiveKind
          }
        }`,
        'query',
      ),
    )

    if (results?.length) {
      this.logger.debug(request, 'Type Exists')
      throw new Error(`${request.primitiveType?.primitiveKind} already exists`)
    }
  }

  /**
   * Throws {@link TypeUnusedError} if the type is the api of an atom
   * @param typeOrTypeId the type id or the result of {@link typeExists}
   */
  async typeIsNotApiOfAtom(typeOrTypeId: string | QueryResult) {
    if (typeof typeOrTypeId === 'string') {
      typeOrTypeId = await this.typeExists(typeOrTypeId)
    }

    if (typeOrTypeId.atoms && typeOrTypeId.atoms.length > 0) {
      throw new TypeUnusedError(undefined, typeOrTypeId.atoms[0].name)
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

    if (typeOrTypeId.fields && typeOrTypeId.fields.length > 0) {
      throw new TypeUnusedError(typeOrTypeId.fields.map((f) => `${f.name}`))
    }
  }

  async validateCreateTypeInput({ typeKind, arrayType }: CreateTypeInput) {
    if (!typeKind) {
      throw new Error('Missing type kind')
    }

    if (arrayType) {
      await this.typeExists(arrayType.itemTypeId)
    }
  }

  /**
   * Checks if the id of type A is referenced anywhere, at any depth, inside type B
   *
   * Throws {@link OverlyNestedTypeError} if the type is too nested based on {@link MAX_TYPE_DEPTH}
   * Throws {@link RecursiveTypeError} if typeAId is referenced inside type B
   */
  notRecursive(typeAId: TypeId, typeBTree: TypeTree) {
    if (typeBTree.getTypeById(typeAId)) {
      throw new RecursiveTypeError()
    }
  }

  private static createGetTypeQuery(typeId: string) {
    return `{
      query(func: type(${DgraphEntityType.Type})) @filter(uid(${typeId})) {
          id: uid
          atoms: ~api @filter(type(Atom)) {
						id: uid
            name
          }
          fields:~type @filter(type(Field)) {
						id: uid
            name
          }
        }
    }`
  }
}

export type QueryResult = Entity & {
  atoms?: Array<
    Entity & {
      name: string
    }
  >
  fields?: Array<
    Entity & {
      name: string
    }
  >
}
