import {
  InterfaceTypeEdge,
  UpsertFieldInput,
} from '@codelab/shared/abstract/codegen-v2'
import { throwIfNullish, throwIfTruthy } from '@codelab/shared/utils'
import { InterfaceType } from 'apps/web/src/graphql/ogm-types.gen'
import { RxTransaction } from 'neo4j-driver'
import { forkJoin, from, Observable } from 'rxjs'
import { map, switchMap, toArray } from 'rxjs/operators'
import { InterfaceType as InterfaceTypeModel } from '../../../../model'
import { GetTypeByIdResponse, typeRepository } from '../../../../repositories'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../../../abstract/withRxTransaction'
import { deleteFieldEdge } from '../deleteFieldEdgeResolver'
import {
  duplicatedKeyErrorFactory,
  interfaceNotExistingErrorFactory,
  recursiveTypeErrorFactory,
  targetTypeNotExistingErrorFactory,
} from './errorFactories'

const validateInterfaceExists = (input: UpsertFieldInput) => {
  const promise = InterfaceTypeModel().find({
    where: { id: input.interfaceTypeId },
  })

  const errorFactory = interfaceNotExistingErrorFactory(input.interfaceTypeId)

  return from(promise).pipe(
    map((r) => r?.[0]),
    throwIfNullish(errorFactory),
  )
}

const validateTargetTypeExists = (txn: RxTransaction, i: UpsertFieldInput) => {
  const errorFactory = targetTypeNotExistingErrorFactory(i.targetTypeId)

  return typeRepository
    .getTypeById(txn, i.targetTypeId)
    .pipe(throwIfNullish(errorFactory))
}

export type ValidateInterfaceAndTargetExistResult = {
  interfaceType: InterfaceType
  targetType: GetTypeByIdResponse
}

const validateInterfaceAndTargetExist = (
  txn: RxTransaction,
  input: UpsertFieldInput,
): Observable<ValidateInterfaceAndTargetExistResult> => {
  const interfaceType$ = validateInterfaceExists(input)
  const targetType$ = validateTargetTypeExists(txn, input)

  // First make sure the interface type and the target types exist
  return forkJoin({
    interfaceType: interfaceType$,
    targetType: targetType$,
  })
}

const validateInterfaceAndTargetExistByCypher = (
  txn: RxTransaction,
  input: UpsertFieldInput,
): Observable<ValidateInterfaceAndTargetExistResult> => {
  const bothIds = [input.interfaceTypeId, input.targetTypeId]

  return typeRepository.getTypeByIds(txn, bothIds).pipe(
    toArray(),
    map((types) => {
      return {
        interfaceType: types?.find(
          (el) => el?.id == input.interfaceTypeId,
        ) as InterfaceType,
        targetType: types?.find(
          (el) => el?.id == input.targetTypeId,
        ) as GetTypeByIdResponse,
      }
    }),
  )
}

export const validateWillNotFormRecursiveRel = (
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
}

export const validateNonDuplicateKey = (
  txn: RxTransaction,
  i: UpsertFieldInput,
) => {
  const errorFactory = duplicatedKeyErrorFactory(i.key)

  return typeRepository
    .getField(txn, i.interfaceTypeId, i.key)
    .pipe(throwIfTruthy(errorFactory))
}

export const createEdgeConnection = (
  txn: RxTransaction,
  input: UpsertFieldInput,
  { interfaceType, targetType }: ValidateInterfaceAndTargetExistResult,
) =>
  typeRepository.connectField(txn, input.interfaceTypeId, input.targetTypeId, {
    key: input.key,
    description: input.description,
    name: input.name,
  })

// Main upsert pipeline
export const upsertFieldEdge: IRxTxnResolver<
  UpsertFieldResolverArgs,
  InterfaceTypeEdge
> =
  ({ input, isCreating }) =>
  (txn) => {
    const deleteInput = {
      input: {
        key: input.key,
        interfaceId: input.interfaceTypeId,
      },
    }

    const validateExist$ = validateInterfaceAndTargetExist(txn, input)
    const deleteExisting$ = deleteFieldEdge(deleteInput)(txn)
    const validateNonDuplicate$ = validateNonDuplicateKey(txn, input)

    // 1.
    // If we're creating - validate we don't have duplicate keys
    // if we're updating - delete old fields if they exist so that we don't deal with duplication issues and we can safely overwrite them
    // Delete type is a no-op if there is no edge, so that's not a problem. If the validation fails - the transaction will be rolled back, so we can safely do it first before checking for duplicated key
    const initial$: Observable<any> = isCreating
      ? validateNonDuplicate$
      : deleteExisting$

    return initial$.pipe(
      switchMap(() =>
        // 2. Validate that the types exist.
        validateExist$.pipe(
          switchMap((existRes) =>
            // 3. Check if we are not creating a recursive type and throw
            // Not doing that earlier with the other checks since that way we can throw a descriptive error with the names of the types
            validateWillNotFormRecursiveRel(txn, input, existRes).pipe(
              // 4. All good, create the field connection
              switchMap(() => createEdgeConnection(txn, input, existRes)),
            ),
          ),
        ),
      ),
    )
  }

export const upsertFieldEdgeWihoutOGM: IRxTxnResolver<
  UpsertFieldResolverArgs,
  InterfaceTypeEdge
> =
  ({ input, isCreating }) =>
  (txn) => {
    const deleteInput = {
      input: {
        key: input.key,
        interfaceId: input.interfaceTypeId,
      },
    }

    const validateExist$ = validateInterfaceAndTargetExistByCypher(txn, input)
    const deleteExisting$ = deleteFieldEdge(deleteInput)(txn)
    const validateNonDuplicate$ = validateNonDuplicateKey(txn, input)

    // 1.
    // If we're creating - validate we don't have duplicate keys
    // if we're updating - delete old fields if they exist so that we don't deal with duplication issues and we can safely overwrite them
    // Delete type is a no-op if there is no edge, so that's not a problem. If the validation fails - the transaction will be rolled back, so we can safely do it first before checking for duplicated key
    const initial$: Observable<any> = isCreating
      ? validateNonDuplicate$
      : deleteExisting$

    return initial$.pipe(
      switchMap(() => {
        console.log('level 1')

        // 2. Validate that the types exist.
        return validateExist$.pipe(
          switchMap((existRes) => {
            console.log('level 2 == = === == ====== ==', existRes)

            // 3. Check if we are not creating a recursive type and throw
            // Not doing that earlier with the other checks since that way we can throw a descriptive error with the names of the types
            return validateWillNotFormRecursiveRel(txn, input, existRes).pipe(
              // 4. All good, create the field connection
              switchMap(() => {
                console.log('level 3')

                return createEdgeConnection(txn, input, existRes)
              }),
            )
          }),
        )
      }),
    )
  }

export interface UpsertFieldResolverArgs {
  input: UpsertFieldInput
  /**
   * If set to true will throw an error if there is an existing field with the same key
   * If set to false - will overwrite it
   * */
  isCreating: boolean
}

// A custom cypher mutation is needed because the default one doesn't handle creating multi-graph edges
// e.g. if we try to create two fields of the same target type, instead of creating 2 fields the default
// neo4j graphql resolver will create 1 and then update the same one the second time.
//
// There is no need for an update resolver since we can just delete any existing relationships with that key
// and recreate them, which effectively is updating them.
export const upsertFieldEdgeResolver = withRxTransaction<
  UpsertFieldResolverArgs,
  InterfaceTypeEdge
>(upsertFieldEdge)

export default upsertFieldEdgeResolver
