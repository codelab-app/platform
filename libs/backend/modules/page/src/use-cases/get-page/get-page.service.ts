import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import { IPage, PageSchema } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageValidator } from '../../domain/page.validator'
import { GetPageRequest } from './get-page.request'

@Injectable()
export class GetPageService extends DgraphUseCase<
  GetPageRequest,
  Nullable<IPage>
> {
  protected schema = PageSchema.nullable().optional()

  constructor(dgraph: DgraphRepository, private pageValidator: PageValidator) {
    super(dgraph)
  }

  protected async executeTransaction(request: GetPageRequest, txn: Txn) {
    const {
      input: { pageId },
      currentUser,
    } = request

    const result = await this.dgraph.getOneNamed<IPage>(
      txn,
      GetPageService.byIdQuery(pageId),
      'query',
    )

    if (result) {
      await this.pageValidator.existsAndIsOwnedBy(pageId, currentUser)
    }

    return result
  }

  public static byIdQuery(pageId: string) {
    return GetPageService.pageQuery(`@filter(uid(${pageId}))`)
  }

  public static pageQuery(filter?: string) {
    return `{
      query(func: type(${DgraphEntityType.Page})) @normalize ${filter || ''} {
        id: uid
        name: name
        root {
          rootElementId: uid
        }
      }
    }`
  }
}
