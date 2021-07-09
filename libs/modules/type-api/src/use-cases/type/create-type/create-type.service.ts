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
  CreatePrimitiveTypeGql,
  CreatePrimitiveTypeMutation,
  CreatePrimitiveTypeMutationVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import {
  EnumType,
  EnumTypeValue,
  FieldCollection,
  Interface,
  PrimitiveType,
  Type,
} from '../../../models'
import { GetTypeService } from '../get-type'
import { CreateTypeInput } from './create-type.input'
import { CreateTypeValidator } from './create-type.validator'

type GqlVariablesType =
  | CreateArrayTypeMutationVariables
  | CreateEnumTypeMutationVariables
  | CreatePrimitiveTypeMutationVariables
  | CreateInterfaceMutationVariables
type GqlOperationType =
  | CreateArrayTypeMutation
  | CreateEnumTypeMutation
  | CreatePrimitiveTypeMutation
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

    if (req.primitiveType) {
      return CreatePrimitiveTypeGql
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

    const primitiveTypeResult = (result.data as CreatePrimitiveTypeMutation)
      .addPrimitiveType

    if (primitiveTypeResult) {
      if (
        !primitiveTypeResult.primitiveType ||
        !primitiveTypeResult.primitiveType[0]
      ) {
        throw new Error('Error while creating type')
      }

      const createdPrimitiveType = primitiveTypeResult.primitiveType[0]

      return new PrimitiveType(
        createdPrimitiveType.id,
        createdPrimitiveType.name,
        createdPrimitiveType.primitiveKind,
      )
    }

    const interfaceResult = (result.data as CreateInterfaceMutation)
      .addInterface

    if (interfaceResult) {
      if (!interfaceResult.interface || !interfaceResult.interface[0]) {
        throw new Error('Error while creating type')
      }

      const createdInterfaceType = interfaceResult.interface[0]

      return new Interface(
        createdInterfaceType.id,
        createdInterfaceType.name,
        new FieldCollection([], []),
      )
    }

    throw new Error('Error while creating type')
  }

  protected mapVariables({
    enumType,
    primitiveType,
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

    if (primitiveType) {
      return {
        input: { ...baseInput, primitiveKind: primitiveType.primitiveKind },
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
