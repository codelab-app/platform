import {
  Auth0UserId,
  DgraphProvider,
  DgraphTokens,
  DgraphUseCase,
} from '@codelab/backend'
import { Dgraph_ElementFragment } from '@codelab/codegen/dgraph'
import { Atom, GetAtomService } from '@codelab/modules/atom-api'
import { Inject, Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js'
import { ElementGuardService } from '../../auth'
import { Element } from '../../models/'
import { GetElementService } from '../get-element'
import { GetLastOrderChildService } from '../get-last-order-child'
import { CreateElementInput } from './create-element.input'
import { CreateElementRequest } from './create-element.request'

interface ValidationContext {
  atom: Atom | undefined | null
  parentElement: Dgraph_ElementFragment | undefined | null
}

@Injectable()
export class CreateElementService extends DgraphUseCase<
  CreateElementRequest,
  Element,
  ValidationContext
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private getElementService: GetElementService,
    private getLastOrderChildService: GetLastOrderChildService,
    private getAtomService: GetAtomService,
    private elementGuardService: ElementGuardService,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input, currentUser }: CreateElementRequest,
    txn: Txn,
    { parentElement }: ValidationContext,
  ) {
    const order = await this.getOrder(input)

    const mu = CreateElementService.createMutation(
      { ...input, order },
      parentElement?.ownedBy?.id,
    )

    const mutationResult = await txn.mutate(mu)

    await txn.commit()

    const uid = mutationResult.getUidsMap().get('element')

    if (!uid) {
      throw CreateElementService.createError()
    }

    const element = await this.getElementService.execute({
      input: {
        elementId: uid,
      },
      currentUser,
    })

    if (!element) {
      throw CreateElementService.createError()
    }

    return element
  }

  private static createMutation(
    { parentElementId, order, name, atomId }: CreateElementInput,
    ownerId?: Auth0UserId,
  ) {
    const mu = new Mutation()
    mu.setSetNquads(`
      _:element <dgraph.type> "Element" .
      _:element <Element.name> "${name}" .
      ${ownerId ? `_:element <Element.ownedBy> <${ownerId}> .` : ''}
      ${
        parentElementId
          ? `_:element <Element.parent> <${parentElementId}> .
            <${parentElementId}> <Element.children> _:element (order=${order}) .`
          : ``
      }
      ${atomId ? `_:element <Element.atom> <${atomId}> .` : ''}
      `)

    return mu
  }

  private static createError() {
    return new Error('Error while creating element')
  }

  private async getOrder(request: CreateElementInput): Promise<number> {
    const { order, parentElementId } = request

    if (order) {
      return order
    }

    // if we don't have order - put it last
    const lastOrderChild = await this.getLastOrderChildService.execute({
      elementId: parentElementId,
    })

    if (lastOrderChild && typeof lastOrderChild.order === 'number') {
      return lastOrderChild.order + 1
    }

    return 1
  }

  protected async validate({
    input: { parentElementId, atomId },
    currentUser,
  }: CreateElementRequest) {
    let parentElement: Dgraph_ElementFragment | null | undefined

    if (parentElementId) {
      parentElement = (
        await this.elementGuardService.validate(parentElementId, currentUser)
      ).element
    }

    let atom: Atom | null | undefined

    if (atomId) {
      atom = await this.getAtomService.execute({ atomId })

      if (!atom) {
        throw new Error('Atom not found')
      }
    }

    return {
      atom,
      parentElement,
    }
  }
}
