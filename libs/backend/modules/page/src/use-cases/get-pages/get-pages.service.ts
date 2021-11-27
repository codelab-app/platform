import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { IPage, PageSchema } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageValidator } from '../../domain/page.validator'
import { GetPagesRequest } from './get-pages.request'

@Injectable()
export class GetPagesService extends DgraphUseCase<
  GetPagesRequest,
  Array<IPage>
> {
  protected schema = PageSchema.array()

  constructor(dgraph: DgraphRepository, private pageValidator: PageValidator) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetPagesRequest,
    txn: Txn,
  ): Promise<Array<IPage>> {
    const {
      input: {
        byApp: { appId },
      },
    } = request

    await this.validate(request)

    return this.dgraph.getAllNamed<IPage>(
      txn,
      GetPagesService.createQuery(appId),
      'query',
    )
  }

  protected async validate({
    input: {
      byApp: { appId },
    },
    currentUser,
  }: GetPagesRequest): Promise<void> {
    await this.pageValidator.validateApp(appId, currentUser)
  }

  private static createQuery(appId: string) {
    return `{
        var(func: type(App)) @filter(uid(${appId})) {
          pages {
            PAGE_IDS as uid
          }
        }
        query(func: type(Page)) @filter(uid(PAGE_IDS)) @normalize {
          id: uid
          name: name
          root {
            rootElementId: uid
          }
        }
      }`
  }
}
