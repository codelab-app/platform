import { Void } from '@codelab/backend/abstract/types'
import { Transaction, Transactional } from '@codelab/backend/application'
import { GqlAuthGuard, ITransaction, RolesGuard } from '@codelab/backend/infra'
import { GetTypeGraphService, TypeGraph } from '@codelab/backend/modules/type'
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
    private getAtomsTypeHookService: GetAtomsTypeHookService,
    private importAtomsService: ImportAtomsService,
    private createAtomsService: UpsertAtomsService,
  ) {}

  @Mutation(() => Atom)
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Transactional()
  async createAtom(
    @Args('input') input: CreateAtomInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const { id } = await this.createAtomService.execute({
      input,
      currentUser,
      transaction,
    })

    const atom = await this.getAtomService.execute({
      input: { where: { id } },
      transaction,
    })

    if (!atom) {
      throw new Error('Atom not created')
    }

    return atom
  }

  @Mutation(() => Atom, { nullable: true })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Transactional()
  async deleteAtom(
    @Args('input') input: DeleteAtomInput,
    @Transaction() transaction: ITransaction,
  ) {
    const { atomId } = input

    const atom = await this.getAtomService.execute({
      input: { where: { id: atomId } },
      transaction,
    })

    if (!atom) {
      throw new Error('Atom not found')
    }

    await this.deleteAtomService.execute(input)

    return atom
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
  @Transactional()
  async importAtoms(
    @Args('input') input: ImportAtomsInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.importAtomsService.execute({ input, currentUser, transaction })
  }

  @Query(() => Atom, { nullable: true })
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async getAtom(
    @Args('input') input: GetAtomInput,
    @Transaction() transaction: ITransaction,
  ) {
    return this.getAtomService.execute({ input, transaction })
  }

  @Mutation(() => Atom, { nullable: true })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Transactional()
  async updateAtom(
    @Args('input') input: UpdateAtomInput,
    @Transaction() transaction: ITransaction,
  ) {
    await this.updateAtomService.execute(input)

    const { id } = input

    const atom = await this.getAtomService.execute({
      input: { where: { id } },
      transaction,
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
    const results = await this.createAtomsService.execute({
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
  @Transactional()
  async apiGraphResolver(
    @Parent() input: Atom,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    return this.getTypeGraphService.execute({
      input: { where: { atomId: input.id } },
      transaction,
    })
  }
}
