import {
  ITransaction,
  ITypeNeo4jRepository,
  ITypeNeo4jRepositoryToken,
  ITypeRepository,
  ITypeRepositoryToken,
} from '@codelab/backend/abstract/core'
import { LoggerService, LoggerTokens } from '@codelab/backend/infra'
import { TypeId, TypeKind } from '@codelab/shared/abstract/core'
import { TypeTree } from '@codelab/shared/core'
import { Inject, Injectable } from '@nestjs/common'
import { RecursiveTypeError } from '../application/errors'
import { TypeUnusedError } from '../application/errors/type-unused.error'
import {
  CreateTypeInput,
  CreateTypeRequest,
} from '../use-cases/type/create-type'

@Injectable()
export class TypeValidator {
  constructor(
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
    @Inject(ITypeNeo4jRepositoryToken)
    private typeNeo4jRepository: ITypeNeo4jRepository,
  ) {}

  /**
   * Throws error if the type doesn't exist
   */
  async typeExists(typeId: TypeId, transaction: ITransaction) {
    const type = await this.typeRepository.getOne(typeId, transaction)

    if (!type) {
      throw new Error('Type does not exist')
    }
  }

  // async typeExists2(typeId: TypeId) {
  //   const type = await this.typeNeo4jRepository.getOne(typeId)

  //   if (!type) {
  //     throw new Error('Type does not exist')
  //   }
  // }

  /**
   * Require that any primitive cannot be created a second time
   *
   * We query for primitive types only first, then check the kind. If it already exists, we don't allow creation
   */
  async primitiveIsNotDuplicated(
    request: CreateTypeRequest,
    txn: ITransaction,
  ): Promise<void> {
    const { input, currentUser } = request

    if (input.typeKind !== TypeKind.PrimitiveType || !input.primitiveType) {
      return
    }

    const where = {
      kind: TypeKind.PrimitiveType,
      primitiveKind: input.primitiveType.primitiveKind,
    }

    const primitives = currentUser
      ? await this.typeRepository.getUserTypes(currentUser.id, where, txn)
      : await this.typeRepository.getAdminTypes(where, txn)

    if (
      primitives.length &&
      primitives.find((p) => p.typeKind === input.typeKind)
    ) {
      this.logger.debug(request, 'Type Exists')
      throw new Error(`${input.primitiveType.primitiveKind} already exists`)
    }
  }

  /**
   * Throws {@link TypeUnusedError} if the type is referenced in any fields or if it's the api of an atom
   */
  async typeIsNotReferenced(typeId: string, transaction: ITransaction) {
    const references = await this.typeRepository.getTypeReferences(
      typeId,
      transaction,
    )

    if (references.atoms?.length) {
      throw new TypeUnusedError(undefined, references.atoms[0].name)
    }

    if (references.fields?.length) {
      throw new TypeUnusedError(references.fields.map((f) => `${f.name}`))
    }
  }

  async validateCreateTypeInput(
    { typeKind, arrayType }: CreateTypeInput,
    transaction: ITransaction,
  ) {
    if (!typeKind) {
      throw new Error('Missing type kind')
    }

    if (arrayType) {
      await this.typeExists(arrayType.itemTypeId, transaction)
    }
  }

  /**
   * Checks if the id of type A is referenced anywhere, at any depth, inside type B
   *
   * Throws {@link RecursiveTypeError} if typeAId is referenced inside type B
   */
  notRecursive(typeAId: TypeId, typeBTree: TypeTree) {
    if (typeBTree.getTypeById(typeAId)) {
      throw new RecursiveTypeError()
    }
  }
}
