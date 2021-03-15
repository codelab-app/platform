import { Inject, Injectable, Scope } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { PrismaDITokens, PrismaService } from '../../../../infrastructure'
import { PrismaClientKey } from '../../../presentation'
import { TransactionalUseCase } from '../TransactionalUseCase'

export type CrudFindUniqueInputType<
  TPrismaClientKey extends PrismaClientKey
> = Parameters<PrismaClient[TPrismaClientKey]['findUnique']>[0]

/** The type of the request that goes into the execute method with a typed input inferred from the prisma key */
interface CrudFindUniqueServiceRequest<
  TPrismaClientKey extends PrismaClientKey
> {
  id: string
  /** Other input for prismaService[key].findUnique() method  */
  input?: CrudFindUniqueInputType<TPrismaClientKey>
  /** This is the prisma client delegate that we will use */
  prismaClientKey: TPrismaClientKey
}

/** The type of the response that the execute method returns, inferred from the prisma key */
export type CrudFindUniqueServiceResponse<
  TPrismaClientKey extends PrismaClientKey
> = ReturnType<PrismaClient[TPrismaClientKey]['create']>

// We will be using the same service for a lot of types. Just in case scoping it  to Request so that we minimize interference
@Injectable({ scope: Scope.REQUEST })
export class CrudFindUniqueService<
  TPrismaClientKey extends PrismaClientKey,
  TUseCaseRequestPort extends CrudFindUniqueServiceRequest<TPrismaClientKey> = CrudFindUniqueServiceRequest<TPrismaClientKey>,
  TUseCaseDtoResponse extends CrudFindUniqueServiceResponse<TPrismaClientKey> = CrudFindUniqueServiceResponse<TPrismaClientKey>
> implements TransactionalUseCase<TUseCaseRequestPort, TUseCaseDtoResponse> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  getPrismaClient<TKey extends PrismaClientKey>(key: TKey): PrismaClient[TKey] {
    return this.prismaService[key]
  }

  async execute({ id, input, prismaClientKey }: TUseCaseRequestPort) {
    const { where: inputWhere, ...inputParams } = input || {}

    try {
      return ((await this.getPrismaClient(prismaClientKey)) as any).findUnique({
        where: {
          id,
          ...inputWhere,
        },
        rejectOnNotFound: true,
        ...inputParams,
      })
    } catch (e) {
      throw new CodelabPrismaError(
        `The ${prismaClientKey} with id ${id} has not been found`,
        e,
      )
    }
  }
}
