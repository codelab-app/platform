import { ApolloClient } from '@apollo/client'
import {
  ApolloClientTokens,
  CreateResponse,
  GqlAuthGuard,
  Void,
} from '@codelab/backend/infra'
import {
  GetTypeService,
  InterfaceType,
  TypeAdapterFactory,
} from '@codelab/backend/modules/type'
import {
  GetAtomsGql,
  GetAtomsQuery,
  GetAtomsQueryVariables,
} from '@codelab/shared/codegen/graphql'
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
import { ExportAtom } from '../use-cases/export-atoms/export-atom.model'
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
  @Query(() => [ExportAtom], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async exportAtoms(@Args('input', { nullable: true }) input?: GetAtomsInput) {
    const {
      data: { getAtoms },
    } = await this.client.query<GetAtomsQuery, GetAtomsQueryVariables>({
      query: GetAtomsGql,
      variables: {
        input,
      },
    })

    if (!getAtoms) {
      return null
    }

    /**
     * Parse for payload
     */
    console.log(getAtoms)

    const base64Buffer = Buffer.from(JSON.stringify(getAtoms)).toString(
      'base64',
    )

    console.log(base64Buffer)

    return base64Buffer
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
