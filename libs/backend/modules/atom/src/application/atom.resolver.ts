import { Void } from '@codelab/backend/abstract/types'
import { GqlAuthGuard, RolesGuard } from '@codelab/backend/infra'
import {
  GetTypeGraphService,
  GetTypeService,
  InterfaceType,
  TypeGraph,
} from '@codelab/backend/modules/type'
import { CurrentUser, Roles } from '@codelab/backend/modules/user'
import { IUser, Role } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Atom } from '../domain/atom.model'
import { CreateAtomInput, CreateAtomService } from '../use-cases/create-atom'
import { DeleteAtomInput, DeleteAtomService } from '../use-cases/delete-atom'
import { GetAtomInput, GetAtomService } from '../use-cases/get-atom'
import { GetAtomsInput, GetAtomsService } from '../use-cases/get-atoms'
import { GetAtomsTypeHookService } from '../use-cases/get-atoms-type-hook'
import { ImportAtomsInput, ImportAtomsService } from '../use-cases/import-atoms'
import { UpdateAtomInput, UpdateAtomService } from '../use-cases/update-atom'
import { UpsertAtomsInput, UpsertAtomsService } from '../use-cases/upsert-atoms'

@Resolver(() => Atom)
@Injectable()
export class AtomResolver {
  constructor(
    private createAtomService: CreateAtomService,
    private getAtomService: GetAtomService,
    private getAtomsService: GetAtomsService,
    private deleteAtomService: DeleteAtomService,
    private updateAtomService: UpdateAtomService,
    private getTypeGraphService: GetTypeGraphService,
    private getTypeService: GetTypeService,
    private getAtomsTypeHookService: GetAtomsTypeHookService,
    private importAtomsService: ImportAtomsService,
    private upsertAtomsService: UpsertAtomsService,
  ) {}

  @Mutation(() => Atom)
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createAtom(
    @Args('input') input: CreateAtomInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createAtomService.execute({
      input,
      currentUser,
    })

    const atom = await this.getAtomService.execute({
      input: { where: { id } },
    })

    if (!atom) {
      throw new Error('Atom not created')
    }

    return atom
  }

  @Mutation(() => Atom)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async deleteAtom(@Args('input') input: DeleteAtomInput) {
    const { atomId } = input

    const atom = await this.getAtomService.execute({
      input: { where: { id: atomId } },
    })

    if (!atom) {
      throw new Error('Atom not found')
    }

    const api = await this.getTypeService.execute({
      input: { where: { atomId } },
    })

    console.log({ api })

    await this.deleteAtomService.execute(input)

    return { ...atom, api }
  }

  @Query(() => [Atom], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getAtomsTypeHook() {
    return this.getAtomsTypeHookService.execute({})
  }

  @Query(() => [Atom], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getAtoms(@Args('input', { nullable: true }) input?: GetAtomsInput) {
    return this.getAtomsService.execute(input)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async importAtoms(
    @Args('input') input: ImportAtomsInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.importAtomsService.execute({ input, currentUser })
  }

  @Query(() => Atom, { nullable: true })
  async getAtom(@Args('input') input: GetAtomInput) {
    return this.getAtomService.execute({ input })
  }

  @Mutation(() => Atom, { nullable: true })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateAtom(@Args('input') input: UpdateAtomInput) {
    await this.updateAtomService.execute(input)

    const { id } = input

    const atom = await this.getAtomService.execute({
      input: { where: { id } },
    })

    if (!atom) {
      throw new Error('Atom not found')
    }

    return atom
  }

  @Mutation(() => [Atom])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async upsertAtoms(
    @Args('input') input: UpsertAtomsInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const results = await this.upsertAtomsService.execute({
      input,
      currentUser,
    })

    const atoms = await this.getAtomsService.execute({
      where: { ids: results.map((r) => r.id) },
    })

    if (!atoms || atoms.length !== input.atoms.length) {
      throw new Error('Atoms not found')
    }

    return atoms
  }

  @ResolveField('apiGraph', () => TypeGraph)
  @UseGuards(GqlAuthGuard)
  async apiGraphResolver(
    @Parent() input: Atom,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.getTypeGraphService.execute({
      input: { where: { atomId: input.id } },
    })
  }

  @ResolveField('api', () => InterfaceType)
  @UseGuards(GqlAuthGuard)
  async apiResolver(@Parent() input: Atom) {
    // That's a hack that allows to return the API of the atom inside the deleteAtom mutation resolver
    if (Object.keys(input.api).length !== 1) {
      return input.api
    }

    return this.getTypeService.execute({
      input: { where: { atomId: input.id } },
    })
  }
}
