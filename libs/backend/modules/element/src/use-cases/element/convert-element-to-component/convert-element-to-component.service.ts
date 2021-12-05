import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../application/element.validator'
import { ConvertElementToComponentRequest } from './convert-element-to-component.request'

@Injectable()
export class ConvertElementToComponentService extends DgraphUseCase<ConvertElementToComponentRequest> {
  constructor(
    dgraph: DgraphRepository,
    private elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: ConvertElementToComponentRequest,
    txn: Txn,
  ) {
    await this.validate(request)

    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  protected createMutation({
    input: { elementId },
  }: ConvertElementToComponentRequest): Mutation {
    // 1. Add componentTag to the target element
    // 2. Add a intermediate element between the parent and the new component, in order to keep the tree structure
    // (e.g. if we don't, and the parent is root, the user won't be able to delete it)
    // 3. Delete the old parent-child relation

    return {
      mutation: `
          upsert {
            query {
              var(func: type(Element)) @filter(uid(${elementId})) {
                NAME as name
                ~children {
                  PARENT as uid
                }
              }
            }
          }

          set {
            <${elementId}> <componentTag> _:tag .
            _:tag <dgraph.type> "${DgraphEntityType.Tag}" .
            _:tag <name> var(NAME) .
            _:tag <isRoot> true .

            uid(PARENT) <children> _:interm .
            _:interm <dgraph.type> "${DgraphEntityType.Element}" .
            _:interm <name> var(NAME) .
            _:interm <children> <${elementId}> .
          }

          delete {
            uid(PARENT) <children> <${elementId}> .
          }
        `,
    }
  }

  protected async validate({
    input: { elementId },
    currentUser,
  }: ConvertElementToComponentRequest): Promise<void> {
    await this.elementValidator.existsAndIsOwnedBy(elementId, currentUser)
  }
}
