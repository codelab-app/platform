import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  UpdateFieldGql,
  UpdateFieldMutation,
  UpdateFieldMutationVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Field } from '../../../models'
import { CreateTypeService } from '../../type'
import { FieldMutationValidator, TypeRef } from '../create-field'
import { GetFieldService } from '../get-field'
import { UpdateFieldRequest } from './update-field.request'

type GqlVariablesType = UpdateFieldMutationVariables
type GqlOperationType = UpdateFieldMutation

@Injectable()
export class UpdateFieldService extends MutationUseCase<
  UpdateFieldRequest,
  Field,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getFieldService: GetFieldService,
    private fieldValidationService: FieldMutationValidator,
    private createTypeService: CreateTypeService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return UpdateFieldGql
  }

  protected extractDataFromResult(
    _: FetchResult<GqlOperationType>,
    __: unknown,
    { input: { fieldId } }: UpdateFieldRequest,
  ) {
    return this.getFieldService.execute({
      input: { byId: { fieldId } },
    }) as Promise<Field>
  }

  protected async mapVariables({
    input: {
      fieldId,
      updateData: { interfaceId, name, description, type, key },
    },
  }: UpdateFieldRequest): Promise<GqlVariablesType> {
    const typeId = await this.getTypeId(type)

    return {
      input: {
        filter: {
          id: [fieldId],
        },
        set: {
          interface: { id: interfaceId },
          name,
          description,
          type: { id: typeId },
          key,
        },
      },
    }
  }

  private async getTypeId(type: TypeRef) {
    let typeId = type.existingTypeId

    // Check if we specify an existing type, if not - create a new one and get its ID
    if (!typeId) {
      if (!type.newType) {
        throw new Error('Either newType or existingTypeId must be provided')
      }

      const createdType = await this.createTypeService.execute(type.newType)
      typeId = createdType.id
    }

    return typeId
  }

  protected async validate({
    input: { updateData, fieldId },
  }: UpdateFieldRequest): Promise<void> {
    await this.fieldValidationService.validate(updateData, fieldId)
  }
}
