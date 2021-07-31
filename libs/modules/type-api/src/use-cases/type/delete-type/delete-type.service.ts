import { DgraphRepository, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { TypeIsUsedError } from '../../../errors/TypeIsUsedError'
import { TypeValidator } from '../../../type.validator'
import { DeleteTypeInput } from './delete-type.input'

@Injectable()
export class DeleteTypeService extends DgraphUseCase<DeleteTypeInput> {
  constructor(dgraph: DgraphRepository, private typeValidator: TypeValidator) {
    super(dgraph)
  }

  protected async executeTransaction(request: DeleteTypeInput, txn: Txn) {
    await this.validate(request)

    await this.dgraph.executeUpsertDeleteAll(txn, (q) =>
      q.setUidFunc(request.typeId).addFields(`fields`),
    )
  }

  protected async validate({ typeId }: DeleteTypeInput) {
    // Check if the deleted type exists
    const type = await this.typeValidator.typeExists(typeId)

    try {
      // If the deleted type is the propTypes of an atom, return an Error
      // the user needs to delete the atom first, otherwise our data will be corrupt (propTypes is a required field of Atom)
      await this.typeValidator.typeIsNotApiOfAtom(type)

      // Check if any fields reference it. If there are any - prevent deleting it
      await this.typeValidator.typeIsNotReferencedInFields(type)
    } catch (e) {
      if (e instanceof TypeIsUsedError) {
        throw new TypeIsUsedError(
          e.fieldNames,
          e.atomName,
          `Can't delete type ${e.message}`,
        )
      }
    }
  }
}
