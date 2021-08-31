import { ApolloClient } from '@apollo/client'
import {
  ApolloClientTokens,
  CreateResponse,
  CurrentUser,
  GqlAuthGuard,
  Void,
} from '@codelab/backend/infra'
import {
  GetTypeService,
  InterfaceType,
  TypeAdapterFactory,
} from '@codelab/backend/modules/type'
import { User } from '@codelab/shared/abstract/core'
import {
  GetAtomsQuery,
  GetAtomsQueryVariables,
  GetExportAtomsGql,
} from '@codelab/shared/codegen/graphql'
import { stringToBase64 } from '@codelab/shared/utils'
import { Inject, Injectable, UseGuards } from '@nestjs/common'
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
import { ExportAtoms } from '../use-cases/export-atoms/export-atoms.model'
import { GetAtomService } from '../use-cases/get-atom'
import { GetAtomInput } from '../use-cases/get-atom/get-atom.input'
import { GetAtomsService } from '../use-cases/get-atoms'
import { GetAtomsInput } from '../use-cases/get-atoms/get-atoms.input'
import { ImportAtomsInput, ImportAtomsService } from '../use-cases/import-atoms'
import { UpdateAtomInput, UpdateAtomService } from '../use-cases/update-atom'

@Resolver(() => Atom)
@Injectable()
export class AtomResolver {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    private client: ApolloClient<any>,
    private createAtomService: CreateAtomService,
    private getAtomService: GetAtomService,
    private getAtomsService: GetAtomsService,
    private deleteAtomService: DeleteAtomService,
    private updateAtomService: UpdateAtomService,
    private getTypeService: GetTypeService,
    private atomAdapter: AtomAdapter,
    private typeAdapterFactory: TypeAdapterFactory,
    private importAtomsService: ImportAtomsService,
  ) {}

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

  @Query(() => [Atom], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getAtoms(@Args('input', { nullable: true }) input?: GetAtomsInput) {
    const atoms = await this.getAtomsService.execute(input)

    if (!atoms) {
      return null
    }

    return this.atomAdapter.map(atoms)
  }

  /**
   * We wrap around getAtoms query, so we can utilize all the nested resolvers. Then we convert all to payload string
   */
  @Query(() => ExportAtoms, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async exportAtoms(
    @CurrentUser() currentUser: User,
    @Args('input', { nullable: true }) input?: GetAtomsInput,
  ) {
    const {
      data: { getAtoms },
    } = await this.client.query<GetAtomsQuery, GetAtomsQueryVariables>({
      query: GetExportAtomsGql,
      variables: {
        input,
      },
    })

    if (!getAtoms) {
      return null
    }

    /**
     * GraphQL uses JSON format, which represents as text format, not as binary.
     *
     * We want to transmit a file based encoding for the frontend to download as file
     */
    return { payload: stringToBase64(JSON.stringify(getAtoms)) }
  }

  @ResolveField('api', () => InterfaceType, { nullable: true })
  async api(@Parent() atom: Atom) {
    const { api } = atom

    if (!api) {
      return null
    }

    return this.typeAdapterFactory.getMapper(api).mapItem(api)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
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
  async updateAtom(@Args('input') input: UpdateAtomInput) {
    await this.updateAtomService.execute(input)
  }
}
