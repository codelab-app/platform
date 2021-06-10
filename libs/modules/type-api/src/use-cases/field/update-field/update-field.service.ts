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
} from '@codelab/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Field } from '../../../models'
import { FieldMutationValidator } from '../create-field'
import { TypeRefMapper } from '../create-field/type-ref.mapper'
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

  protected mapVariables({
    input: {
      fieldId,
      updateData: { interfaceId, name, description, type, key },
    },
  }: UpdateFieldRequest): GqlVariablesType {
    const typeRefMapper = new TypeRefMapper()
    const typeRef = typeRefMapper.map(type)

    return {
      input: {
        filter: {
          id: [fieldId],
        },
        set: {
          interface: { id: interfaceId },
          name,
          description,
          type: typeRef,
          key,
        },
      },
    }
  }

  protected async validate({
    input: { updateData, fieldId },
  }: UpdateFieldRequest): Promise<void> {
    await this.fieldValidationService.validate(updateData, fieldId)
  }
}
