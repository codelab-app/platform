import { Void } from '@codelab/backend/abstract/types'
import { CreateResponse } from '@codelab/backend/application'
import {
  GetTypeService,
  InterfaceType,
  TypeAdapterFactory,
} from '@codelab/backend/modules/type'
import { GqlAuthGuard, Roles, RolesGuard } from '@codelab/backend/modules/user'
import { Role } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { AtomAdapter } from '../domain/atom.adapter'
import { Atom } from '../domain/atom.model'
import { CreateAtomInput, CreateAtomService } from '../use-cases/create-atom'
import { DeleteAtomInput, DeleteAtomService } from '../use-cases/delete-atom'
import { GetAtomService } from '../use-cases/get-atom'
import { GetAtomInput } from '../use-cases/get-atom/get-atom.input'
import { GetAtomsService } from '../use-cases/get-atoms'
import { GetAtomsInput } from '../use-cases/get-atoms/get-atoms.input'
import { GetAtomsWithApisService } from '../use-cases/get-atoms-with-apis'
import { ImportAtomsInput, ImportAtomsService } from '../use-cases/import-atoms'
import { UpdateAtomInput, UpdateAtomService } from '../use-cases/update-atom'

@Resolver(() => Atom)
@Injectable()
export class AtomResolver {
  constructor(
    private createAtomService: CreateAtomService,
    private getAtomService: GetAtomService,
    private getAtomsService: GetAtomsService,
    private getAtomsWithApisService: GetAtomsWithApisService,
    private deleteAtomService: DeleteAtomService,
    private updateAtomService: UpdateAtomService,
    private getTypeService: GetTypeService,
    private atomAdapter: AtomAdapter,
    private typeAdapterFactory: TypeAdapterFactory,
    private importAtomsService: ImportAtomsService,
  ) {}

  @Mutation(() => CreateResponse)
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  createAtom(@Args('input') input: CreateAtomInput) {
    return this.createAtomService.execute(input)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  @Roles(Role.Admin)
  async deleteAtom(@Args('input') input: DeleteAtomInput) {
    await this.deleteAtomService.execute(input)
  }

  @Query(() => [Atom], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getAtoms(@Args('input', { nullable: true }) input?: GetAtomsInput) {
    const atoms = await this.getAtomsService.execute(input)

    if (!atoms) {
      return null
    }

    return this.atomAdapter.map(atoms)
  }

  @ResolveField('api', () => InterfaceType, { nullable: true })
  async api(@Parent() atom: Atom) {
    const { api } = atom

    if (!api) {
      return null
    }

    return await this.typeAdapterFactory.getMapper(api).mapItem(api)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  @Roles(Role.Admin)
  async importAtoms(@Args('input') input: ImportAtomsInput) {
    await this.importAtomsService.execute(input)
  }

  @Query(() => Atom, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getAtom(@Args('input') input: GetAtomInput) {
    const atom = await this.getAtomService.execute(input)

    if (!atom) {
      return null
    }

    return this.atomAdapter.mapItem(atom)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  @Roles(Role.Admin)
  async updateAtom(@Args('input') input: UpdateAtomInput) {
    await this.updateAtomService.execute(input)
  }
}
