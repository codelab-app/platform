import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, ITransaction } from '@codelab/backend/infra'
import {
  FieldSchema,
  IField,
  IInterfaceType,
  IUser,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { TypeTree } from '@codelab/shared/core'
import { Inject, Injectable } from '@nestjs/common'
import { Field } from '../../../domain'
import { FieldValidator } from '../../../domain/field/field.validator'
import { TypeValidator } from '../../../domain/type.validator'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { CreateTypeService } from '../../type/create-type'
import { GetTypeGraphService } from '../../type/get-type-graph'
import { TypeRef } from './create-field.input'
import { CreateFieldRequest } from './create-field.request'

@Injectable()
export class CreateFieldService extends DgraphUseCase<
  CreateFieldRequest,
  Field
> {
  protected override autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
    private fieldValidator: FieldValidator,
    private typeValidator: TypeValidator,
    private createTypeService: CreateTypeService,
    private getTypeGraphService: GetTypeGraphService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreateFieldRequest,
    txn: ITransaction,
  ) {
    const {
      input: { type, interfaceId, key, name, description },
      currentUser,
    } = request

    const theInterface = await this.typeRepository.getOne(interfaceId, txn)

    if (!theInterface) {
      throw new Error('Interface not found')
    }

    if (theInterface.typeKind !== TypeKind.InterfaceType) {
      throw new Error("Type is not interface, can't add field to it")
    }

    await this.validate(request, theInterface, txn)

    const typeId = await this.getTypeId(type, currentUser)

    const field = FieldSchema.parse({
      id: '',
      name,
      key,
      description,
      target: typeId,
      source: interfaceId,
    } as IField)

    theInterface.fields.push(field)

    await this.typeRepository.update(theInterface, txn)

    const updatedInterface = await this.typeRepository.getOne(interfaceId, txn)

    if (
      !updatedInterface ||
      updatedInterface.typeKind !== TypeKind.InterfaceType
    ) {
      throw new Error(
        'Something went wrong. Interface not found after updating it',
      )
    }

    return new Field(
      updatedInterface.fields.find(
        (f) => f.key === key && f.name === name,
      ) as IField,
    )
  }

  private async getTypeId(type: TypeRef, currentUser: IUser) {
    let typeId = type.existingTypeId

    // Check if we specify an existing type, if not - create a new one and get its ID
    if (!typeId) {
      if (!type.newType) {
        throw new Error('Either newType or existingTypeId must be provided')
      }

      const createdType = await this.createTypeService.execute({
        input: type.newType,
        currentUser,
      })

      typeId = createdType.id
    }

    return typeId
  }

  /**
   * Throws Error if:
   * - There is another field with that key in the same interface
   * - The specified existingTypeId does not exist
   * - The specified existingTypeId causes a recursive type reference
   * - Neither existingTypeId nor newType are provided
   */
  protected async validate(
    {
      input: {
        interfaceId, // the interface we're adding the field to
        key,
        type: { existingTypeId, newType }, // the type of the field we're creating now
      },
    }: CreateFieldRequest,
    theInterface: IInterfaceType,
    txn: ITransaction,
  ): Promise<void> {
    await this.fieldValidator.keyIsUnique(theInterface, key)

    if ((!existingTypeId && !newType) || (existingTypeId && newType)) {
      throw new Error('Either existingTypeId or newType must be provided')
    }

    /**
     * {type: Interface, id: 01, fields: [{type: }]}
     * {type: Array, id: 02, itemType: 01}
     */

    // If we specify an existing type, check if it exists and that we don't cause a recursive type reference
    if (existingTypeId) {
      await this.typeValidator.typeExists(existingTypeId, txn)

      const graph = await this.getTypeGraphService.execute({
        input: { where: { id: existingTypeId } },
      })

      if (!graph) {
        // Shouldn't happen, we check in typeValidator.typeExists
        throw new Error('Type graph not found')
      }

      const existingTypeTree = new TypeTree(graph)
      this.typeValidator.notRecursive(interfaceId, existingTypeTree)
    }
  }
}
