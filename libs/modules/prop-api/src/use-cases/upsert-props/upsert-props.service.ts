import {
  BaseDgraphFields,
  DgraphProvider,
  DgraphTokens,
  DgraphUseCase,
} from '@codelab/backend'
import { PropValueRef } from '@codelab/codegen/dgraph'
import { Atom, GetAtomByService } from '@codelab/modules/atom-api'
import {
  DgraphSimpleType,
  DgraphType,
  FieldDgraphFields,
  GetDgraphFieldService,
  PrimitiveType,
  SimpleTypeDgraphFields,
} from '@codelab/modules/type-api'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { UpsertPropMutationBuilder } from './upert-props.mutation'
import { UpsertValueInput } from './upsert-props.input'
import { UpsertPropsRequest } from './upsert-props.request'
import { UpsertPropsResponse } from './upsert-props.response'

@Injectable()
export class UpsertPropsService extends DgraphUseCase<
  UpsertPropsRequest,
  UpsertPropsResponse
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private getDgraphField: GetDgraphFieldService,
    private getAtomByService: GetAtomByService,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    request: UpsertPropsRequest,
    txn: Txn,
  ): Promise<UpsertPropsResponse> {
    const req = new UpsertPropMutationBuilder(request.input).buildRequest()
    const response = await txn.doRequest(req)
    await txn.commit()

    if (response.getUidsMap().getLength() > 0) {
      return { ok: true }
    }

    return { ok: false }
  }

  protected valueInputToDgraphValueRef(
    value: UpsertValueInput,
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

  protected async validate({ input }: UpsertPropsRequest) {
    // It's likely the page element will be the same, cache it
    const cachedAtomsByPageElement: Map<string, Atom> = new Map<string, Atom>()

    const getPageElement = async (id: string) => {
      if (cachedAtomsByPageElement.has(id)) {
        return cachedAtomsByPageElement.get(id)
      }

      const atom = await this.getAtomByService.execute({
        byPageElement: { pageElementId: id },
      })

      if (!atom) {
        throw new Error('Page element or its prop types not found')
      }

      cachedAtomsByPageElement.set(id, atom)

      return atom
    }

    for (const { value, fieldId, pageElementId } of input) {
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
        const atom = await getPageElement(pageElementId)

        // Check if the field is part of this page element's atom's propTypes
        if (
          atom &&
          atom.propTypes.id !==
            field[FieldDgraphFields.Interface][BaseDgraphFields.uid]
        ) {
          throw new Error(
            "Can only add prop to the page element ' interface fields",
          )
        }
      } else {
        // this is here because we can add componentId here too
        throw new Error('pageElementId must be provided')
      }

      const fieldType = (field[FieldDgraphFields.Type] as DgraphType)[
        BaseDgraphFields.DgraphType
      ][0]

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
            throw new Error(
              'A string value must be provided for an string field',
            )
          } else if (
            primitiveType === PrimitiveType.Boolean &&
            !value.booleanValue
          ) {
            throw new Error(
              'A boolean value must be provided for an boolean field',
            )
          } else if (
            primitiveType === PrimitiveType.Float &&
            !value.floatValue
          ) {
            throw new Error('A float value must be provided for an float field')
          } else if (
            primitiveType === PrimitiveType.Integer &&
            !value.intValue
          ) {
            throw new Error(
              'An integer value must be provided for an integer field',
            )
          }
        } else if (fieldType === 'EnumType' && !value.stringValue) {
          throw new Error('An string value must be provided for an enum field')
        }
      }
    }
  }
}
