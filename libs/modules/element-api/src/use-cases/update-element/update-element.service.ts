import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  UpdateElementGql,
  UpdateElementMutation,
  UpdateElementMutationVariables,
} from '@codelab/codegen/dgraph'
import { GetAtomService } from '@codelab/modules/atom-api'
import { Inject, Injectable } from '@nestjs/common'
import { z } from 'zod'
import { ElementGuardService } from '../../auth'
import { Element } from '../../models'
import { UpdateElementRequest } from './update-element.request'

type GqlVariablesType = UpdateElementMutationVariables
type GqlOperationType = UpdateElementMutation

@Injectable()
export class UpdateElementService extends MutationUseCase<
  UpdateElementRequest,
  Element,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getAtomService: GetAtomService,
    private elementGuardService: ElementGuardService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return UpdateElementGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    const elements = result?.data?.updateElement?.element

    if (!elements || !elements.length) {
      throw new Error('Error while updating element')
    }

    return z.array(Element.Schema).parse(elements)[0]
  }

  protected async mapVariables({
    input: { elementId, updateData },
  }: UpdateElementRequest): Promise<GqlVariablesType> {
    return {
      input: {
        filter: {
          id: [elementId],
        },
        set: {
          name: updateData.name,
          css: updateData.css,
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
      elementId,
      updateData: { atomId },
    },
    currentUser,
  }: UpdateElementRequest): Promise<void> {
    await this.elementGuardService.validate(elementId, currentUser)

    if (atomId) {
      const atom = await this.getAtomService.execute({ atomId })

      if (!atom) {
        throw new Error('Atom not found')
      }
    }
  }
}
