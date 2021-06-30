import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  CreateArrayTypeGql,
  CreateArrayTypeMutation,
  CreateArrayTypeMutationVariables,
  CreateEnumTypeGql,
  CreateEnumTypeMutation,
  CreateEnumTypeMutationVariables,
  CreateInterfaceGql,
  CreateInterfaceMutation,
  CreateInterfaceMutationVariables,
  CreateSimpleTypeGql,
  CreateSimpleTypeMutation,
  CreateSimpleTypeMutationVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import {
  EnumType,
  EnumTypeValue,
  FieldCollection,
  Interface,
  SimpleType,
  Type,
} from '../../../models'
import { GetTypeService } from '../get-type'
import { CreateTypeInput } from './create-type.input'
import { CreateTypeValidator } from './create-type.validator'

type GqlVariablesType =
  | CreateArrayTypeMutationVariables
  | CreateEnumTypeMutationVariables
  | CreateSimpleTypeMutationVariables
  | CreateInterfaceMutationVariables
type GqlOperationType =
  | CreateArrayTypeMutation
  | CreateEnumTypeMutation
  | CreateSimpleTypeMutation
  | CreateInterfaceMutation

@Injectable()
export class CreateTypeService extends MutationUseCase<
  CreateTypeInput,
  Type,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getTypeService: GetTypeService,
    private createTypeValidator: CreateTypeValidator,
  ) {
    super(apolloClient)
  }

  protected getGql(req: CreateTypeInput) {
    if (req.arrayType) {
      return CreateArrayTypeGql
    }

    if (req.enumType) {
      return CreateEnumTypeGql
    }

    if (req.simpleType) {
      return CreateSimpleTypeGql
    }

    if (req.interfaceType) {
      return CreateInterfaceGql
    }

    throw new Error('Error while creating type')
  }

  protected async extractDataFromResult(
    result: FetchResult<GqlOperationType>,
  ): Promise<Type> {
    const arrayResult = (result.data as CreateArrayTypeMutation).addArrayType

    if (arrayResult) {
      if (!arrayResult.arrayType || !arrayResult.arrayType[0]) {
        throw new Error('Error while creating type')
      }

      const found = await this.getTypeService.execute({
        input: {
          typeId: arrayResult.arrayType[0].id,
        },
      })

      if (!found) {
        throw new Error('Error while creating type')
      }

      return found
    }

    const enumResult = (result.data as CreateEnumTypeMutation).addEnumType

    if (enumResult) {
      if (!enumResult.enumType || !enumResult.enumType[0]) {
        throw new Error('Error while creating type')
      }

      const createdEnumType = enumResult.enumType[0]

      return new EnumType(
        createdEnumType.id,
        createdEnumType.name,
        createdEnumType.allowedValues.map(
          (av) => new EnumTypeValue(av.id, av.name || null, av.value),
        ),
      )
    }

    const simpleTypeResult = (result.data as CreateSimpleTypeMutation)
      .addSimpleType

    if (simpleTypeResult) {
      if (!simpleTypeResult.simpleType || !simpleTypeResult.simpleType[0]) {
        throw new Error('Error while creating type')
      }

      const createdSimpleType = simpleTypeResult.simpleType[0]

      return new SimpleType(
        createdSimpleType.id,
        createdSimpleType.name,
        createdSimpleType.primitiveType,
      )
    }

    const interfaceResult = (result.data as CreateInterfaceMutation)
      .addInterface

    if (interfaceResult) {
      if (!interfaceResult.interface || !interfaceResult.interface[0]) {
        throw new Error('Error while creating type')
      }

      const createdSimpleType = interfaceResult.interface[0]

      return new Interface(
        createdSimpleType.id,
        createdSimpleType.name,
        new FieldCollection([], []),
      )
    }

    throw new Error('Error while creating type')
  }

  protected mapVariables({
    enumType,
    simpleType,
    arrayType,
    interfaceType,
    name,
  }: CreateTypeInput): GqlVariablesType {
    const baseInput = { name }

    if (arrayType) {
      return {
        input: { ...baseInput, type: { id: arrayType.itemTypeId } },
      }
    }

    if (simpleType) {
      return {
        input: { ...baseInput, primitiveType: simpleType.primitiveType },
      }
    }

    if (enumType) {
      return {
        input: { ...baseInput, allowedValues: enumType.allowedValues },
      }
    }

    if (interfaceType) {
      return {
        input: { ...baseInput },
      }
    }

    throw new Error('Error while creating type')
  }

  protected async validate(request: CreateTypeInput): Promise<void> {
    await this.createTypeValidator.validate(request)
  }
}
