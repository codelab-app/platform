import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Atom } from './atom.model'
import {
  CreateAtomInput,
  CreateAtomService,
  DeleteAtomInput,
  DeleteAtomService, GetAtomService,
  GetAtomsService,
  UpdateAtomInput,
  UpdateAtomService,
} from './use-cases'
import { GetAtomInput } from './use-cases/get-atom/get-atom.input'
import { GqlAuthGuard } from '@codelab/modules/auth-api';

@Resolver(() => Atom)
@Injectable()
export class AtomResolver {
  constructor(
    private createService: CreateAtomService,
    private getAtomService: GetAtomService,
    private getAtomsService: GetAtomsService,
    private deleteAtomService: DeleteAtomService,
    private updateAtomService: UpdateAtomService,
  ) {}

  @Mutation(() => Atom)
  @UseGuards(GqlAuthGuard)
  createAtom(@Args('input') input: CreateAtomInput) {
    return this.createService.execute(input)
  }

  @Mutation(() => Atom)
  @UseGuards(GqlAuthGuard)
  deleteAtom(@Args('input') input: DeleteAtomInput) {
    return this.deleteAtomService.execute(input)
  }

  @Query(() => [Atom])
  @UseGuards(GqlAuthGuard)
  getAtoms() {
    return this.getAtomsService.execute({})
  }

  @Query(() => Atom, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getAtom(@Args('input') input: GetAtomInput) {
    return this.getAtomService.execute(input)
  }

  @Mutation(() => Atom)
  @UseGuards(GqlAuthGuard)
  updateAtom(@Args('input') input: UpdateAtomInput) {
    return this.updateAtomService.execute(input)
  }
}
