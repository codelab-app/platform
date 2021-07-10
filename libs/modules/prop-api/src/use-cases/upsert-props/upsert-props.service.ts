import {
  BaseDgraphFields,
  DgraphProvider,
  DgraphTokens,
  DgraphUseCase,
  instanceOfDgraphModel,
} from '@codelab/backend'
import { Atom, GetAtomByService } from '@codelab/modules/atom-api'
import {
  DgraphArrayType,
  DgraphEnumType,
  DgraphFieldFields,
  DgraphInterface,
  DgraphPrimitiveType,
  DgraphType,
  GetDgraphFieldService,
  PrimitiveKind,
  PrimitiveTypeFields,
} from '@codelab/modules/type-api'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { UpsertPropMutationBuilder } from './upert-props.mutation'
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

  protected async validate({ input }: UpsertPropsRequest) {
    // It's likely the element will be the same, cache it
    const cachedAtomsByElementId: Map<string, Atom> = new Map<string, Atom>()

    const getElement = async (id: string) => {
      if (cachedAtomsByElementId.has(id)) {
        return cachedAtomsByElementId.get(id)
      }

      const atom = await this.getAtomByService.execute({
        byElement: { elementId: id },
      })

      if (!atom) {
        throw new Error('Element or its prop types not found')
      }

      cachedAtomsByElementId.set(id, atom)

      return atom
    }

    for (const { value, fieldId, elementId } of input) {
      if (value) {
        const valueInputs = [
          value.arrayValue,
          value.intValue,
          value.floatValue,
          value.interfaceValue,
          value.booleanValue,
          value.stringValue,
          value.enumValueId,
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

      if (elementId) {
        const atom = await getElement(elementId)

        // Check if the field is part of this element's atom's propTypes
        if (
          atom &&
          atom.propTypes.id !==
            field[DgraphFieldFields.Interface][BaseDgraphFields.uid]
        ) {
          throw new Error("Can only add prop to the element ' interface fields")
        }
      } else {
        // this is here because we can add componentId here too
        throw new Error('elementId must be provided')
      }

      const fieldType = (field[DgraphFieldFields.Type] as DgraphType)[
        BaseDgraphFields.DgraphType
      ][0]

      if (value) {
        if (
          instanceOfDgraphModel(field, DgraphInterface) &&
          !value.interfaceValue
        ) {
          throw new Error(
            'An interface value must be provided for an interface field',
          )
        }

        if (
          instanceOfDgraphModel(field, DgraphArrayType) &&
          !value.arrayValue
        ) {
          throw new Error('An array value must be provided for an array field')
        }

        if (instanceOfDgraphModel(field, DgraphPrimitiveType)) {
          const primitiveKind = (
            field[DgraphFieldFields.Type] as DgraphPrimitiveType
          )[PrimitiveTypeFields.Kind]

          if (primitiveKind === PrimitiveKind.String && !value.stringValue) {
            throw new Error(
              'A string value must be provided for an string field',
            )
          }

          if (primitiveKind === PrimitiveKind.Boolean && !value.booleanValue) {
            throw new Error(
              'A boolean value must be provided for an boolean field',
            )
          }

          if (primitiveKind === PrimitiveKind.Float && !value.floatValue) {
            throw new Error('A float value must be provided for an float field')
          }

          if (primitiveKind === PrimitiveKind.Integer && !value.intValue) {
            throw new Error(
              'An integer value must be provided for an integer field',
            )
          }
        }

        if (
          instanceOfDgraphModel(field, DgraphEnumType) &&
          !value.enumValueId
        ) {
          throw new Error('An enum value id must be provided for an enum field')
        }
      }
    }
  }
}
