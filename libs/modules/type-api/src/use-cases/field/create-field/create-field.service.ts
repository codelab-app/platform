import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  CreateFieldGql,
  CreateFieldMutation,
  CreateFieldMutationVariables,
} from '@codelab/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Field, fieldSchema } from '../../../models'
import { CreateFieldRequest } from './create-field.request'
import { FieldMutationValidator } from './field-mutation-validator.service'
import { TypeRefMapper } from './type-ref.mapper'

type GqlVariablesType = CreateFieldMutationVariables
type GqlOperationType = CreateFieldMutation

export const MAX_ARRAY_DEPTH = 20

@Injectable()
export class CreateFieldService extends MutationUseCase<
  CreateFieldRequest,
  Field,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private fieldValidationService: FieldMutationValidator,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return CreateFieldGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    const fields = result.data?.addField?.field

    if (!fields || !fields.length || !fields[0]) {
      throw new Error('Error while creating field')
    }

    return fieldSchema.parse({
      ...fields[0],
      typeId: fields[0].type.id,
    })
  }

  protected mapVariables({
    input: { type, key, interfaceId, name, description },
  }: CreateFieldRequest): GqlVariablesType {
    const typeRefMapper = new TypeRefMapper()

    return {
      input: [
        {
          type: typeRefMapper.map(type),
          key,
          interface: { id: interfaceId },
          name,
          description,
        },
      ],
    }
  }

  protected async validate({ input }: CreateFieldRequest): Promise<void> {
    await this.fieldValidationService.validate(input)
  }
}
