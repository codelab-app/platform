import type { Page } from '@codelab/shared/abstract/codegen'
import { PageProperties } from '@codelab/shared/domain/mapper'
import type { IFieldResolver } from '@graphql-tools/utils'

export const pageElements: IFieldResolver<Page, unknown> = (
  page: Pick<Page, 'rootElement'>,
) => {
  //
}
