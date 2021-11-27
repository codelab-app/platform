import { Void } from '@codelab/backend/abstract/types'
import { GqlAuthGuard, RolesGuard } from '@codelab/backend/infra'
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
import { GetAtomsService } from '../use-cases/get-atoms'
import { GetAtomsInput } from '../use-cases/get-atoms/get-atoms.input'
import { ImportAtomsInput, ImportAtomsService } from '../use-cases/import-atoms'
import { UpdateAtomInput, UpdateAtomService } from '../use-cases/update-atom'
import { UpsertAtomsInput } from '../use-cases/upsert-atoms/upsert-atoms.input'
import { UpsertAtomsService } from '../use-cases/upsert-atoms/upsert-atoms.service'

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
    private importAtomsService: ImportAtomsService,
    private createAtomsService: UpsertAtomsService,
  ) {}

  @Mutation(() => Atom)
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createAtom(
    @Args('input') input: CreateAtomInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createAtomService.execute({ input, currentUser })

    const atom = await this.getAtomService.execute({
      where: { id },
    })

    if (!atom) {
      throw new Error('Atom not created')
    }

    return atom
  }

  @Mutation(() => Atom, { nullable: true })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async deleteAtom(@Args('input') input: DeleteAtomInput) {
    const { atomId } = input

    const atom = await this.getAtomService.execute({
      where: { id: atomId },
    })

    if (!atom) {
      throw new Error('Atom not found')
    }

    await this.deleteAtomService.execute(input)

    return atom
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
  @UseGuards(GqlAuthGuard)
  async getAtom(@Args('input') input: GetAtomInput) {
    return this.getAtomService.execute(input)
  }

  @Mutation(() => Atom, { nullable: true })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateAtom(@Args('input') input: UpdateAtomInput) {
    await this.updateAtomService.execute(input)

    const { id } = input

    const atom = await this.getAtomService.execute({
      where: { id },
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
  async apiGraphResolver(
    @Parent() input: Atom,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.getTypeGraphService.execute({
      input: { where: { atomId: input.id } },
      currentUser,
    })
  }
}
