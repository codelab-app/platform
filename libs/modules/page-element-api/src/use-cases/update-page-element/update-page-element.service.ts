import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  UpdatePageElementGql,
  UpdatePageElementMutation,
  UpdatePageElementMutationVariables,
} from '@codelab/dgraph'
import { GetAtomService } from '@codelab/modules/atom-api'
import { Inject, Injectable } from '@nestjs/common'
import { z } from 'zod'
import { PageElementGuardService } from '../../auth'
import { PageElement, pageElementSchema } from '../../models'
import { UpdatePageElementRequest } from './update-page-element.request'

type GqlVariablesType = UpdatePageElementMutationVariables
type GqlOperationType = UpdatePageElementMutation

@Injectable()
export class UpdatePageElementService extends MutationUseCase<
  UpdatePageElementRequest,
  PageElement,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getAtomService: GetAtomService,
    private pageElementGuardService: PageElementGuardService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return UpdatePageElementGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    const elements = result?.data?.updatePageElement?.pageElement

    if (!elements || !elements.length) {
      throw new Error('Error while updating page element')
    }

    return z.array(pageElementSchema).parse(elements)[0]
  }

  protected async mapVariables({
    input: { pageElementId, updateData },
  }: UpdatePageElementRequest): Promise<GqlVariablesType> {
    return {
      input: {
        filter: {
          id: [pageElementId],
        },
        set: {
          name: updateData.name,
          atom: updateData.atomId
            ? {
                id: updateData.atomId,
              }
            : null,
        },
      },
    }
  }

  protected async validate({
    input: {
      pageElementId,
      updateData: { atomId },
    },
    currentUser,
  }: UpdatePageElementRequest): Promise<void> {
    await this.pageElementGuardService.validate(pageElementId, currentUser)

    if (atomId) {
      const atom = await this.getAtomService.execute({ atomId })

      if (!atom) {
        throw new Error('Atom not found')
      }
    }
  }
}
