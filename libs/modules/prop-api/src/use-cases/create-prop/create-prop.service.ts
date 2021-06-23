import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
  ApolloClientTokens,
  BaseDgraphFields,
  MutationUseCase,
} from '@codelab/backend'
import {
  CreatePropGql,
  CreatePropMutation,
  CreatePropMutationVariables,
  PropValueRef,
} from '@codelab/dgraph'
import { GetPageElementService } from '@codelab/modules/page-element-api'
import {
  DgraphSimpleType,
  Field,
  FieldDgraphFields,
  GetDgraphFieldService,
  PrimitiveType,
  SimpleTypeDgraphFields,
} from '@codelab/modules/type-api'
import { Inject, Injectable } from '@nestjs/common'
import { FetchResult } from 'apollo-link'
import { mapGqlFragmentToValue, Prop } from '../../models'
import { GetPropsService } from '../get-props'
import { CreateValueInput } from './create-prop.input'
import { CreatePropRequest } from './create-prop.request'

type GqlVariablesType = CreatePropMutationVariables
type GqlOperationType = CreatePropMutation

@Injectable()
export class CreatePropService extends MutationUseCase<
  CreatePropRequest,
  Prop,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getDgraphField: GetDgraphFieldService,
    private getPageElementService: GetPageElementService,
    private getPropsService: GetPropsService,
  ) {
    super(apolloClient)
  }

  protected extractDataFromResult(
    result: FetchResult<GqlOperationType>,
  ): Promise<Prop> | Prop {
    const dataArray = result?.data?.addProp?.prop

    if (!dataArray || !dataArray[0]) {
      throw new Error('Error while creating prop')
    }

    const data = dataArray[0]

    return new Prop({
      id: data.id,
      field: Field.fromGql(data.field),
      value: data.value ? mapGqlFragmentToValue(data.value) : null,
    })
  }

  protected getGql() {
    return CreatePropGql
  }

  protected mapVariables({
    input: { value, fieldId, pageElementId },
  }: CreatePropRequest): GqlVariablesType {
    return {
      input: {
        field: { id: fieldId },
        pageElement: { id: pageElementId },
        value: value ? this.valueInputToDgraphValueRef(value) : null,
      },
    }
  }

  protected valueInputToDgraphValueRef(
    value: CreateValueInput,
    iteration = 0,
  ): PropValueRef {
    if (iteration > 100) {
      throw new Error('Value too nested')
    }

    if (value.intValue) {
      return { intValueRef: { intValue: value.intValue.value } }
    } else if (value.floatValue) {
      return { floatValueRef: { floatValue: value.floatValue.value } }
    } else if (value.arrayValue) {
      return {
        arrayValueRef: {
          values: value.arrayValue.values.map((av) =>
            this.valueInputToDgraphValueRef(av, iteration + 1),
          ),
        },
      }
    } else if (value.stringValue) {
      return { stringValueRef: { stringValue: value.stringValue.value } }
    } else if (value.booleanValue) {
      return { booleanValueRef: { booleanValue: value.booleanValue.value } }
    } else if (value.interfaceValue) {
      return {
        interfaceValueRef: {
          props: value.interfaceValue.props.map((prop) => ({
            field: { id: prop.fieldId },
            pageElement: { id: prop.pageElementId },
            value: prop.value
              ? this.valueInputToDgraphValueRef(prop.value, iteration + 1)
              : null,
          })),
        },
      }
    }

    throw new Error('No value input found')
  }

  protected async validate({
    input: { value, fieldId, pageElementId },
    currentUser,
  }: CreatePropRequest) {
    if (value) {
      const valueInputs = [
        value.arrayValue,
        value.intValue,
        value.floatValue,
        value.interfaceValue,
        value.booleanValue,
        value.stringValue,
      ].filter((vi) => !!vi)

      if (valueInputs.length > 1 || valueInputs.length < 1) {
        throw new Error('Only 1 value input must be specified')
      }
    }

    const field = await this.getDgraphField.execute({
      input: { byId: { fieldId } },
    })

    if (!field) {
      throw new Error('Field not found')
    }

    if (pageElementId) {
      const pageElement = await this.getPageElementService.execute({
        input: { pageElementId },
        currentUser,
      })

      if (!pageElement) {
        throw new Error('Page element not found')
      }

      // Check if the field is part of this page element's atom's propTypes
      if (
        pageElement.atom &&
        pageElement.atom.propTypes.id !==
          field[FieldDgraphFields.Interface][BaseDgraphFields.uid]
      ) {
        throw new Error(
          "Can only add prop to the page element ' interface fields",
        )
      }

      // Check if the pageElement doesn't already have a prop for this field
      const foundProps = await this.getPropsService.execute({
        byPageElement: { pageElementId, fieldId },
      })

      if (foundProps && foundProps.length) {
        throw new Error('A prop with this field exists for this page element')
      }
    } else {
      //this is here because we can add componentId here too
      throw new Error('pageElementId must be provided')
    }

    const fieldType =
      field[FieldDgraphFields.Type][BaseDgraphFields.DgraphType][0]

    if (value) {
      if (fieldType === 'Interface' && !value.interfaceValue) {
        throw new Error(
          'An interface value must be provided for an interface field',
        )
      } else if (fieldType === 'ArrayType' && !value.arrayValue) {
        throw new Error('An array value must be provided for an array field')
      } else if (fieldType === 'SimpleType') {
        const primitiveType = (
          field[FieldDgraphFields.Type] as DgraphSimpleType
        )[SimpleTypeDgraphFields.PrimitiveType]

        if (primitiveType === PrimitiveType.String && !value.stringValue) {
          throw new Error('A string value must be provided for an string field')
        } else if (
          primitiveType === PrimitiveType.Boolean &&
          !value.booleanValue
        ) {
          throw new Error(
            'A boolean value must be provided for an boolean field',
          )
        } else if (primitiveType === PrimitiveType.Float && !value.floatValue) {
          throw new Error('A float value must be provided for an float field')
        } else if (primitiveType === PrimitiveType.Integer && !value.intValue) {
          throw new Error(
            'An integer value must be provided for an integer field',
          )
        }
      } else if (fieldType === 'EnumType' && !value.stringValue) {
        throw new Error('An string value must be provided for an enum field')
      } else if (
        fieldType === 'UnitType' &&
        !value.floatValue &&
        !value.intValue
      ) {
        throw new Error(
          'An integer or float value must be provided for an unit field',
        )
      }
    }
  }
}
