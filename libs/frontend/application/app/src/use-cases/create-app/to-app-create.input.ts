import type { ICreateAppData } from '@codelab/frontend/abstract/domain'
import { systemPagesInput } from '@codelab/frontend-application-page/use-cases/create-page'
import type { AppCreateInput } from '@codelab/shared/abstract/codegen'
import type { IUserDto } from '@codelab/shared/abstract/core'
import { AppProperties, connectOwner } from '@codelab/shared/domain'

export const toAppCreateInput = (
  { id, name }: ICreateAppData,
  owner: IUserDto,
): AppCreateInput => ({
  compositeKey: AppProperties.appCompositeKey(name, owner),
  id,
  owner: connectOwner(owner),
  pages: {
    create: systemPagesInput({ id }, `${name}(${owner.username})`, owner),
  },
})
