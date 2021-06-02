import type { DgraphProvider } from '@codelab/backend'
import { DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { AppGuardService } from '@codelab/modules/app-api'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { Page } from '../../page.model'
import { GetPageService } from '../get-page'
import { CreatePageRequest } from './create-page.request'

@Injectable()
export class CreatePageService extends DgraphUseCase<
  CreatePageRequest,
  Partial<Page>,
  void
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private appGuardService: AppGuardService,
    private getPageService: GetPageService,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input: { name, appId }, currentUser }: CreatePageRequest,
    txn: Txn,
  ) {
    const mutationResult = await txn.mutate({
      setNquads: `
        _:page <dgraph.type> "Page" .
        _:page <Page.name> "${name}" .
        _:page <Page.app> <${appId}> .
        <${appId}> <App.pages> _:page .
        _:page <Page.rootElement> _:rootElement .

        _:rootElement <dgraph.type> "PageElement" .
        _:rootElement <PageElement.name> "Page Root" .
        _:rootElement <PageElement.page> _:page .
        _:rootElement <PageElement.name> "Page Root" .
      `,
    })

    await txn.commit()

    const uid = mutationResult.data.uids.page

    if (!uid) {
      throw new Error('Error while creating page')
    }

    const page = await this.getPageService.execute({
      input: {
        pageId: uid,
      },
      currentUser,
    })

    if (!page) {
      throw new Error('Error while creating page')
    }

    return page
  }

  protected async validate({
    currentUser,
    input: { appId },
  }: CreatePageRequest): Promise<void> {
    await this.appGuardService.validate(appId, currentUser)
  }
}
