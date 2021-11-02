import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  jsonMutation,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { Optional } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { TypeValidator } from '../../../domain/type.validator'
import { GetTypeService } from '../get-type'
import { GetTypesService } from '../get-types'
import { CreateTypeRequest } from './create-type.request'
import { CreateTypeInput } from './inputs/create-type.input'

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
      CreateTypeService.createMutation(request, blankNodeUid),
    )
  }

  public static createMutation(
    {
      input,
      currentUser,
    }: Omit<CreateTypeRequest, 'input'> & { input: Optional<CreateTypeInput> },
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
    } = input

    return jsonMutation({
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Type],
      name,
      typeKind,
      /**
       * We use owner field to determine policy
       */
      owner: currentUser.roles.includes(Role.User)
        ? { uid: currentUser.id }
        : null,
      itemType: arrayType ? { uid: arrayType.itemTypeId } : undefined,
      primitiveKind: primitiveType ? primitiveType.primitiveKind : undefined,
      elementKind: elementType ? elementType.kind : undefined,
      typesOfUnionType:
        unionType?.typeIdsOfUnionType.map((id) => ({ uid: id })) || [],
      allowedValues:
        enumType?.allowedValues.map((allowedValue, i) => ({
          'dgraph.type': [DgraphEntityType.EnumTypeValue],
          name: allowedValue.name,
          stringValue: allowedValue.value,
          order: i,
        })) ?? [],
    })
  }

  protected async validate(request: CreateTypeRequest): Promise<void> {
    await this.typeValidator.validateCreateTypeInput(request.input)
    await this.typeValidator.primitiveIsNotDuplicated(request.input)
  }
}
