import { RxTransaction } from 'neo4j-driver'
import { forkJoin, from, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import {
  InterfaceTypeEdge,
  MutationUpsertFieldEdgeArgs,
  UpsertFieldInput,
} from '../../../../ogm-types.gen'
import { typeRepository } from '../../../../repositories'
import { typeValidator } from '../../../../repositories/type/type.validator'
import { IRxTxnResolver } from '../../../abstract/withRxTransaction'

/**
 * A custom cypher mutation is needed because the default one doesn't handle creating multi-graph edges
 *
 * e.g. if we try to create two fields of the same target type, instead of creating 2 fields the default neo4j graphql resolver will create 1 and then update the same one the second time.
 *
 * There is no need for an update resolver since we can just delete any existing relationships with that key and recreate them, which effectively is updating them.
 */
export const upsertFieldEdge: IRxTxnResolver<
  any,
  any,
  MutationUpsertFieldEdgeArgs,
  InterfaceTypeEdge
> =
  (parent, { input, isCreating }) =>
  (txn) => {
    const deleteInput = {
      input: {
        key: input.key,
        interfaceId: input.interfaceTypeId,
      },
    }

    const validateExist$ = typeValidator.validateInterfaceAndTargetExist(
      txn,
      input,
    )

    const deleteExisting$ = typeRepository.disconnectField(
      txn,
      deleteInput.input.interfaceId,
      deleteInput.input.key,
    )

    const validateNonDuplicate$ = typeValidator.validateNonDuplicateKey(
      txn,
      input,
    )

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
            typeValidator
              .validateWillNotFormRecursiveRel(txn, input, existRes)
              .pipe(
                // 4. All good, create the field connection
                switchMap(() => {
                  return typeRepository.connectField(
                    txn,
                    existRes.interfaceType.id,
                    existRes.targetType.id,
                    {
                      key: input.key,
                      description: input.description,
                      name: input.name,
                    },
                  )
                }),
              ),
          ),
        ),
      ),
    )
  }
