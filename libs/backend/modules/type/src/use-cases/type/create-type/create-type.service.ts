import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphArrayType,
  DgraphElementType,
  DgraphEntityType,
  DgraphEnumType,
  DgraphInterfaceType,
  DgraphPrimitiveType,
  DgraphRepository,
  jsonMutation,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { TypeValidator } from '../../../domain/type.validator'
import { GetTypeService } from '../get-type'
import { CreateTypeInput } from './create-type.input'
import { typeKindDgraphMap } from './typeKind'

@Injectable()
export class CreateTypeService extends DgraphCreateUseCase<CreateTypeInput> {
  constructor(
    dgraph: DgraphRepository,
    private getTypeService: GetTypeService,
    private typeValidator: TypeValidator,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: CreateTypeInput, txn: Txn) {
    this.logger.debug(request, 'Creating type')

    await this.validate(request)

    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  private createMutation(request: CreateTypeInput, blankNodeUid: string) {
    const {
      name,
      typeKind,
      arrayType,
      enumType,
      primitiveType,
      elementType,
      // lambdaType,
      // componentType,
      // interfaceType,
    } = request

    return jsonMutation<
      DgraphArrayType &
        DgraphEnumType &
        DgraphPrimitiveType &
        DgraphInterfaceType &
        DgraphElementType
    >({
      uid: blankNodeUid,
      'dgraph.type': [
        DgraphEntityType.Type,
        typeKindDgraphMap[typeKind],
      ] as any,
      name,
      itemType: arrayType ? { uid: arrayType.itemTypeId } : undefined,
      primitiveKind: primitiveType ? primitiveType.primitiveKind : undefined,
      kind: elementType ? elementType.kind : undefined,
      allowedValues: enumType
        ? enumType.allowedValues.map((allowedValue) => ({
            'dgraph.type': [DgraphEntityType.EnumTypeValue],
            name: allowedValue.name,
            stringValue: allowedValue.value,
          }))
        : undefined,
    })
  }

  protected async validate(request: CreateTypeInput): Promise<void> {
    await this.typeValidator.validateCreateTypeInput(request)
    await this.typeValidator.primitiveIsNotDuplicated(request)
  }
}
