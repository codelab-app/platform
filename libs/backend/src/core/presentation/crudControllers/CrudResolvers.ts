import { Inject, Injectable } from '@nestjs/common'
import { Args } from '@nestjs/graphql'
import { PrismaClient } from '@prisma/client'
import { PrismaDITokens, PrismaService } from '../../..'
import {
  CrudCreateInputType,
  CrudCreateService,
} from '../../application/useCase/crud/CrudCreateService'

export type PrismaClientKey = {
  [K in keyof PrismaClient]: PrismaClient[K] extends () => Promise<any>
    ? never
    : keyof PrismaClient[K] extends
        | '$on'
        | '$use'
        | '$executeRaw'
        | '$queryRaw'
        | '$transaction'
    ? never
    : K
}[keyof PrismaClient]

/**
 * A base Resolvers class with the most common CRUD options built in
 * Extend it in your Resolvers class, override getPrismaClientKey, add desired queries and mutations as methods
 * and call the base methods in them
 */
@Injectable()
export abstract class CrudResolvers<TPrismaClientKey extends PrismaClientKey> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
    private readonly createService: CrudCreateService<TPrismaClientKey>,
    private readonly getAppService: GetAppService,
    private readonly getAppsService: GetAppsService,
    private readonly updateAppService: UpdateAppService,
    private readonly deleteAppService: DeleteAppService,
  ) {}

  abstract getPrismaClientKey(): TPrismaClientKey

  create(input: CrudCreateInputType<TPrismaClientKey>) {
    return this.createService.execute({
      input,
      prismaClientKey: this.getPrismaClientKey(),
    })
  }

  get(@Args('input') input: GetAppInput) {
    return this.getAppService.execute({ ...input })
  }

  getAll(@CurrentUser() user: User) {
    return this.getAppsService.execute({ user })
  }

  update(
    @Args('input') { id, ...input }: UpdateAppInput,
    @CurrentUser() user: User,
  ) {
    return this.updateAppService.execute({
      appId: id,
      user,
      ...input,
    })
  }

  delete(@Args('input') input: DeleteAppInput) {
    return this.deleteAppService.execute(input)
  }
}
