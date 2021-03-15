import { Inject, Injectable, Scope } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { TransactionalUseCase } from '..'
import { CodelabPrismaError } from '../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { PrismaDITokens, PrismaService } from '../../../../infrastructure'
import { PrismaClientKey } from '../../../presentation'

export type CrudCreateInputType<
  TPrismaClientKey extends PrismaClientKey
> = Parameters<PrismaClient[TPrismaClientKey]['create']>[0]

/** The type of the request that goes into the execute method with a typed input inferred from the prisma key */
interface CrudCreateServiceRequest<TPrismaClientKey extends PrismaClientKey> {
  /** The input for prismaService[key].create() method */
  input: CrudCreateInputType<TPrismaClientKey>
  /** This is the prisma client delegate that we will use  */
  prismaClientKey: TPrismaClientKey
}

/**  The type of the response that the execute method returns, inferred from the prisma key */
export type CrudCreateServiceResponseType<
  TPrismaClientKey extends PrismaClientKey
> = ReturnType<PrismaClient[TPrismaClientKey]['create']>

// We will be using the same service for a lot of types. Just in case scoping it  to Request so that we minimize interference
@Injectable({ scope: Scope.REQUEST })
export class CrudCreateService<
  TPrismaClientKey extends PrismaClientKey,
  TUseCaseRequestPort extends CrudCreateServiceRequest<TPrismaClientKey> = CrudCreateServiceRequest<TPrismaClientKey>,
  TUseCaseDtoResponse extends CrudCreateServiceResponseType<TPrismaClientKey> = CrudCreateServiceResponseType<TPrismaClientKey>
> implements TransactionalUseCase<TUseCaseRequestPort, TUseCaseDtoResponse> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  getPrismaClient<TKey extends PrismaClientKey>(key: TKey): PrismaClient[TKey] {
    return this.prismaService[key]
  }

  async execute({ input, prismaClientKey }: TUseCaseRequestPort) {
    if (!prismaClientKey) {
      throw new Error(
        "Can't execute crud create service. prismaServiceKey is not set",
      )
    }

    try {
      return ((await this.getPrismaClient<typeof prismaClientKey>(
        prismaClientKey,
      )) as any).create(input) as TUseCaseDtoResponse
    } catch (e) {
      throw new CodelabPrismaError(`Unable to create ${prismaClientKey}`, e)
    }
  }
}
