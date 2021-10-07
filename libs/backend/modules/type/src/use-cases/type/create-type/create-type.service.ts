import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphArrayType,
  DgraphElementType,
  DgraphEntityType,
  DgraphEnumType,
  DgraphInterfaceType,
  DgraphPrimitiveType,
  DgraphRepository,
  DgraphUnionType,
  jsonMutation,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { TypeValidator } from '../../../domain/type.validator'
import { GetTypeService } from '../get-type'
import { GetTypesService } from '../get-types'
import { CreateTypeRequest } from './create-type.request'
import { typeKindDgraphMap } from './typeKind'

/**
 * Depending on the type, we may assign a user to it. For example, primitive types are admin created & can only have 1 copy, so these aren't assigned users.
 *
 * But an interface created by a user should have an owner, while an interface created by admin shouldn't.
 *
 * TLDR: Admin created types don't have owners, while users do
 */
@Injectable()
export class CreateTypeService extends DgraphCreateUseCase<CreateTypeRequest> {
  constructor(
    dgraph: DgraphRepository,
    private getTypeService: GetTypeService,
    private getTypesService: GetTypesService,
    private typeValidator: TypeValidator,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: CreateTypeRequest, txn: Txn) {
    this.logger.debug(request, 'Creating type')

    await this.validate(request)

    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  private createMutation(
    { input, currentUser }: CreateTypeRequest,
    blankNodeUid: string,
  ) {
    const {
      name,
      typeKind,
      arrayType,
      enumType,
      primitiveType,
      elementType,
      unionType,
      // lambdaType,
      // componentType,
      // interfaceType,
    } = input

    return jsonMutation<
      DgraphArrayType &
        DgraphEnumType &
        DgraphPrimitiveType &
        DgraphInterfaceType &
        DgraphElementType &
        DgraphUnionType
    >({
      uid: blankNodeUid,
      'dgraph.type': [
        DgraphEntityType.Type,
        typeKindDgraphMap[typeKind],
      ] as any,
      name,
      /**
       * We use owner field to determine policy
       */
      owner: currentUser.roles.includes(Role.User)
        ? { uid: currentUser.id }
        : null,
      itemType: arrayType ? { uid: arrayType.itemTypeId } : undefined,
      primitiveKind: primitiveType ? primitiveType.primitiveKind : undefined,
      kind: elementType ? elementType.kind : undefined,
      typesOfUnionType:
        unionType?.typeIdsOfUnionType.map((id) => ({ uid: id })) || [],
      allowedValues: enumType
        ? enumType.allowedValues.map((allowedValue) => ({
            'dgraph.type': [DgraphEntityType.EnumTypeValue],
            name: allowedValue.name,
            stringValue: allowedValue.value,
          }))
        : undefined,
    })
  }

  protected async validate(request: CreateTypeRequest): Promise<void> {
    await this.typeValidator.validateCreateTypeInput(request.input)
    await this.typeValidator.primitiveIsNotDuplicated(request.input)
  }
}
