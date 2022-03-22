import { throwIfNullish, throwIfTruthy } from '@codelab/shared/utils'
import { InterfaceType } from 'apps/web/src/graphql/ogm-types.gen'
import { RxTransaction } from 'neo4j-driver'
import { forkJoin, from, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { InterfaceType as InterfaceTypeModel } from '../../model'
import { UpsertFieldInput } from '../../ogm-types.gen'
import {
  duplicatedKeyErrorFactory,
  interfaceNotExistingErrorFactory,
  recursiveTypeErrorFactory,
  targetTypeNotExistingErrorFactory,
} from '../../resolvers/type/field/upsertFieldEdge/errorFactories'
import { GetTypeByIdResponse, typeRepository } from './type.repository'

export type ValidateInterfaceAndTargetExistResult = {
  interfaceType: InterfaceType
  targetType: GetTypeByIdResponse
}

export const typeValidator = {
  validateTargetTypeExists: (txn: RxTransaction, i: UpsertFieldInput) => {
    const errorFactory = targetTypeNotExistingErrorFactory(i.targetTypeId)

    return typeRepository
      .getTypeById(txn, i.targetTypeId)
      .pipe(throwIfNullish(errorFactory))
  },

  validateInterfaceExists: (input: UpsertFieldInput) => {
    const promise = InterfaceTypeModel().find({
      where: { id: input.interfaceTypeId },
    })

    const errorFactory = interfaceNotExistingErrorFactory(input.interfaceTypeId)

    return from(promise).pipe(
      map((r) => r?.[0]),
      throwIfNullish(errorFactory),
    )
  },

  validateInterfaceAndTargetExist: (
    txn: RxTransaction,
    input: UpsertFieldInput,
  ): Observable<ValidateInterfaceAndTargetExistResult> => {
    const interfaceType$ = typeValidator.validateInterfaceExists(input)
    const targetType$ = typeValidator.validateTargetTypeExists(txn, input)

    // First make sure the interface type and the target types exist
    return forkJoin({
      interfaceType: interfaceType$,
      targetType: targetType$,
    })
  },

  validateWillNotFormRecursiveRel: (
    txn: RxTransaction,
    i: UpsertFieldInput,
    { interfaceType, targetType }: ValidateInterfaceAndTargetExistResult,
  ) => {
    const errorFactory = recursiveTypeErrorFactory(
      interfaceType?.name,
      targetType?.name,
    )

    return typeRepository
      .isTypeDescendantOf(txn, i.targetTypeId, i.interfaceTypeId)
      .pipe(throwIfTruthy(errorFactory))
  },

  validateNonDuplicateKey: (txn: RxTransaction, i: UpsertFieldInput) => {
    const errorFactory = duplicatedKeyErrorFactory(i.key)

    return typeRepository
      .getField(txn, i.interfaceTypeId, i.key)
      .pipe(throwIfTruthy(errorFactory))
  },
}
