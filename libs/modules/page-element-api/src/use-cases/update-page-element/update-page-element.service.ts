import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  UpdatePageElementGql,
  UpdatePageElementMutation,
  UpdatePageElementMutationVariables,
} from '@codelab/dgraph'
import { GetAtomService } from '@codelab/modules/atom-api'
import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { PageElement, pageElementSchema } from '../../models'
import {
  UpdatePageElementData,
  UpdatePageElementInput,
} from './update-page-element.input'

type GqlVariablesType = UpdatePageElementMutationVariables
type GqlOperationType = UpdatePageElementMutation

@Injectable()
export class UpdatePageElementService extends MutationUseCase<
  UpdatePageElementInput,
  PageElement,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    apollo: ApolloClientService,
    private getAtomService: GetAtomService,
  ) {
    super(apollo)
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

  protected async getVariables({
    pageElementId,
    updateData,
  }: UpdatePageElementInput): Promise<GqlVariablesType> {
    await this.validate(updateData)

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

  async validate({ atomId }: UpdatePageElementData) {
    if (atomId) {
      const atom = await this.getAtomService.execute({ atomId })

      if (!atom) {
        throw new Error('Atom not found')
      }
    }
  }
}
