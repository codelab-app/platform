/// <reference types='jest'/>

import type { IRepository } from '@codelab/frontend/abstract/application'
import type { IEntity } from '@codelab/shared/abstract/types'

export const mockRepository = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  repository: IRepository<IEntity, any, IEntity, object>,
) => {
  jest.spyOn(repository, 'add').mockImplementation()
  jest.spyOn(repository, 'delete').mockImplementation()
  jest.spyOn(repository, 'find').mockImplementation(() =>
    Promise.resolve({
      aggregate: { count: 0 },
      items: [],
    }),
  )
  jest.spyOn(repository, 'findOne').mockImplementation()
  jest.spyOn(repository, 'update').mockImplementation()
}
