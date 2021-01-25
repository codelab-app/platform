import { Prisma } from '@prisma/client'
import * as O from 'fp-ts/lib/Option'
import { Option } from 'fp-ts/lib/Option'
import { PageRepositoryPort } from '../../core/adapters/PageRepositoryPort'
import { Page } from '../../core/domain/page'
import { NodeType, PrismaService } from '@codelab/backend'

export class PrismaPageRepositoryAdapter implements PageRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async exists(where: Prisma.PageWhereUniqueInput): Promise<boolean> {
    return !!(await this.prismaService.page.findUnique({
      where,
    }))
  }

  // TODO: implement cascade delete
  async delete(where: Prisma.PageWhereUniqueInput): Promise<Option<Page>> {
    try {
      const page = await this.prismaService.page.delete({
        where,
      })

      return O.some(Page.hydrate(page))
    } catch (e) {
      return O.none
    }
  }

  async findOne(where: Prisma.PageWhereUniqueInput): Promise<Option<Page>> {
    const found = await this.prismaService.page.findUnique({
      where,
    })

    return found ? O.some(Page.hydrate(found)) : O.none
  }

  async findMany(where: Prisma.PageWhereInput): Promise<Array<Page>> {
    const pages = await this.prismaService.page.findMany({
      where,
    })

    return pages.map((page) => Page.hydrate(page))
  }

  async create(
    data: Prisma.PageCreateInput,
    appId: string,
  ): Promise<Option<Page>> {
    try {
      const page = await this.prismaService.page.create({
        data: {
          ...data,
          app: {
            connect: {
              id: appId,
            },
          },
          graphs: {
            create: [
              {
                label: data.title,
                vertices: {
                  create: [
                    {
                      type: NodeType.React_Grid_Layout_Container,
                      // props: {}
                    },
                  ],
                },
              },
            ],
          },
        },
      })

      return O.some(Page.hydrate(page))
    } catch (e) {
      return O.none
    }
  }

  async update(
    where: Prisma.PageWhereUniqueInput,
    data: Prisma.PageUpdateInput,
  ): Promise<Option<Page>> {
    const updated = await this.prismaService.page.update({
      data,
      where,
    })

    return updated ? O.some(Page.hydrate(updated)) : O.none
  }
}
