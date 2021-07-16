import {
  ArrayMapper,
  CreateResponse,
  DgraphAtom,
  GqlAuthGuard,
  Void,
} from '@codelab/backend'
import { GetTypeService } from '@codelab/modules/type-api'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AtomMapper } from './atom.mapper'
import { Atom } from './atom.model'
import {
  CreateAtomInput,
  CreateAtomService,
  DeleteAtomInput,
  DeleteAtomService,
  GetAtomService,
  GetAtomsService,
  UpdateAtomInput,
  UpdateAtomService,
} from './use-cases'
import { GetAtomInput } from './use-cases/get-atom/get-atom.input'

@Resolver(() => Atom)
@Injectable()
export class AtomResolver {
  private readonly atomsMapper: ArrayMapper<DgraphAtom, Atom>

  constructor(
    private createAtomService: CreateAtomService,
    private getAtomService: GetAtomService,
    private getAtomsService: GetAtomsService,
    private deleteAtomService: DeleteAtomService,
    private updateAtomService: UpdateAtomService,
    private getTypeService: GetTypeService,
    private atomMapper: AtomMapper,
  ) {
    this.atomsMapper = new ArrayMapper(atomMapper)
  }

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  createAtom(@Args('input') input: CreateAtomInput) {
    return this.createAtomService.execute(input)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteAtom(@Args('input') input: DeleteAtomInput) {
    await this.deleteAtomService.execute(input)
  }

  @Query(() => [Atom])
  @UseGuards(GqlAuthGuard)
  async getAtoms() {
    const atoms = await this.getAtomsService.execute({})

    return this.atomsMapper.map(atoms)
  }

  @Query(() => Atom, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getAtom(@Args('input') input: GetAtomInput) {
    const atom = await this.getAtomService.execute(input)

    return atom ? this.atomMapper.map(atom) : null
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateAtom(@Args('input') input: UpdateAtomInput) {
    await this.updateAtomService.execute(input)
  }
}
