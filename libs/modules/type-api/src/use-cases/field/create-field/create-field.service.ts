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
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Field, fieldSchema } from '../../../models'
import { CreateTypeService } from '../../type'
import { TypeRef } from './create-field.input'
import { CreateFieldRequest } from './create-field.request'
import { FieldMutationValidator } from './field-mutation-validator.service'

type GqlVariablesType = CreateFieldMutationVariables
type GqlOperationType = CreateFieldMutation

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
    private createTypeService: CreateTypeService,
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

  protected async mapVariables({
    input: { type, key, interfaceId, name, description },
  }: CreateFieldRequest): Promise<GqlVariablesType> {
    const typeId = await this.getTypeId(type)

    return {
      input: [
        {
          type: {
            id: typeId,
          },
          key,
          interface: { id: interfaceId },
          name,
          description,
        },
      ],
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

  protected async validate({ input }: CreateFieldRequest): Promise<void> {
    await this.fieldValidationService.validate(input)
  }
}
