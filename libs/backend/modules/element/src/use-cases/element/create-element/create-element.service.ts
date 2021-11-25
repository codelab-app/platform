import {
  CreateResponse,
  DgraphCreateUseCase,
} from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { AtomsWhereInput, GetAtomsService } from '@codelab/backend/modules/atom'
import { AtomType, IAtom } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../application/element.validator'
import { GetElementGraphService } from '../get-element-graph'
import { GetLastOrderChildService } from '../get-last-order-child'
import {
  AtomRef,
  CreateElementChildInput,
  CreateElementInput,
} from './create-element.input'
import { CreateElementRequest } from './create-element.request'
import {
  AtomIdResolver,
  ElementMutationFactory,
} from './element-mutation.factory'

@Injectable()
export class CreateElementService extends DgraphCreateUseCase<CreateElementRequest> {
  constructor(
    protected readonly dgraph: DgraphRepository,
    private getElementService: GetElementGraphService,
    private getLastOrderChildService: GetLastOrderChildService,
    private getAtomsService: GetAtomsService,
    private elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreateElementRequest,
    txn: Txn,
  ): Promise<CreateResponse> {
    const { atoms } = await this.validate(request)
    const { input } = request
    const order = await this.getOrder(input)

    return await this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(
        {
          ...request,
          input: { ...input, order },
        },
        blankNodeUid,
        atoms,
      ),
    )
  }

  private async createMutation(
    { input, currentUser }: CreateElementRequest,
    blankNodeUid: string,
    atoms: Array<IAtom>,
  ) {
    const mu: Mutation = {}
    const atomsByType = new Map(atoms.map((a) => [a.type, a]))

    const atomResolver: AtomIdResolver = (type: AtomType) => {
      const atom = atomsByType.get(type)

      if (!atom) {
        throw new Error(`Atom ${type} not found`)
      }

      return atom.id
    }

    const createElementJson = await new ElementMutationFactory(
      atomResolver,
      currentUser,
    ).create(input, blankNodeUid)

    if (input.parentElementId) {
      mu.setJson = {
        uid: input.parentElementId,
        children: createElementJson,
      }
    } else {
      mu.setJson = createElementJson
    }

    return mu
  }

  /**
   * Returns the order from the request if defined, if not - gets the order of the last child of the same parent
   * and returns it + 1
   */
  private async getOrder(request: CreateElementInput): Promise<number> {
    const { order, parentElementId } = request

    if (order) {
      return order
    }

    if (parentElementId) {
      // if we don't have order - put it last
      const lastOrderChild = await this.getLastOrderChildService.execute({
        elementId: parentElementId,
      })

      if (lastOrderChild && typeof lastOrderChild.order === 'number') {
        return lastOrderChild.order + 1
      }
    }

    // If nothing else - put it by default as 1
    return 1
  }

  protected async validate({ input, currentUser }: CreateElementRequest) {
    const { parentElementId } = input

    if (parentElementId) {
      /** Validate the parent element exists and is owned by the current user */
      await this.elementValidator.existsAndIsOwnedBy(
        parentElementId,
        currentUser,
      )
    }

    const atomRefs = this.getAllAtomRefs(input)

    if (atomRefs.length > 0) {
      /** Validate the atoms exists */
      const atomIds = new Array<string>()
      const atomTypes = new Array<AtomType>()

      for (const { atomId, atomType } of atomRefs) {
        if (atomId) {
          atomIds.push(atomId)
        }

        if (atomType) {
          atomTypes.push(atomType)
        }
      }

      const atomsByIds = await this.validateAtomsExist(
        atomIds,
        { ids: atomIds },
        (a) => a.id,
      )

      const atomsByTypes = await this.validateAtomsExist(
        atomTypes,
        { types: atomTypes },
        (a) => a.type,
      )

      return {
        atoms: [...atomsByIds, ...atomsByTypes],
      }
    }

    return { atoms: [] as Array<IAtom> }
  }

  private getAllAtomRefs({
    atom,
    children,
  }: CreateElementChildInput): Array<AtomRef> {
    const atomRefs: Array<AtomRef> = atom ? [atom] : []

    if (children) {
      for (const child of children) {
        if (child.newElement) {
          atomRefs.push(...this.getAllAtomRefs(child.newElement))
        }
      }
    }

    return atomRefs
  }

  private async validateAtomsExist<T extends string | AtomType>(
    inputs: Array<T>,
    where: AtomsWhereInput,
    valueExtractor: (a: IAtom) => T,
  ) {
    const retrievedAtoms = await this.getAtomsService.execute({
      where,
    })

    const foundAtomsSet = new Set(retrievedAtoms.map(valueExtractor))
    const missingAtoms = inputs.filter((input) => !foundAtomsSet.has(input))

    if (missingAtoms.length === 1) {
      throw new Error(`Atom ${missingAtoms[0]} not found`)
    } else if (missingAtoms.length > 1) {
      throw new Error(`Atoms ${missingAtoms.join(', ')} not found`)
    }

    return retrievedAtoms
  }
}
