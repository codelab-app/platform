import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Atom } from './atom.model'
import {
  CreateAtomInput,
  CreateAtomService,
  DeleteAtomInput,
  DeleteAtomService,
  GetAtomsService,
  UpdateAtomInput,
  UpdateAtomService,
} from './use-cases'
import { GetAtomInput } from './use-cases/get-atom/get-atom.input'

@Resolver(() => Atom)
@Injectable()
export class AtomResolver {
  constructor(
    private createService: CreateAtomService,
    private getAtomService: GetAtomsService,
    private getAtomsService: GetAtomsService,
    private deleteAtomService: DeleteAtomService,
    private updateAtomService: UpdateAtomService,
  ) {}

  @Mutation(() => Atom)
  createAtom(@Args('input') input: CreateAtomInput) {
    return this.createService.execute({
      input,
    })
  }

  @Mutation(() => Atom)
  deleteAtom(@Args('input') input: DeleteAtomInput) {
    return this.deleteAtomService.execute(input)
  }

  @Query(() => [Atom])
  getAtoms() {
    return this.getAtomsService.execute({})
  }

  @Query(() => Atom, { nullable: true })
  getAtom(@Args('input') input: GetAtomInput) {
    return this.getAtomService.execute(input)
  }

  @Mutation(() => Atom)
  updateAtom(@Args('input') input: UpdateAtomInput) {
    return this.updateAtomService.execute(input)
  }
}
