/// <reference types='jest'/>

import {
  IRepository,
  IType,
  IUser,
  RendererType,
  elementTreeRef,
} from '@codelab/frontend/abstract/core'
import { AtomService } from '@codelab/frontend/domain/atom'
import { ComponentService } from '@codelab/frontend/domain/component'
import { ElementService } from '@codelab/frontend/domain/element'
import { PageService } from '@codelab/frontend/domain/page'
import { PropService } from '@codelab/frontend/domain/prop'
import { RenderService, Renderer } from '@codelab/frontend/domain/renderer'
import { ActionService, StoreService } from '@codelab/frontend/domain/store'
import { TagService } from '@codelab/frontend/domain/tag'
import { FieldService, TypeService } from '@codelab/frontend/domain/type'
import { data } from 'jquery'
import { objectMap } from 'mobx-keystone'
import { TestRootStore } from './test-root-store'
import { AppService } from '@codelab/frontend/domain/app'
import { IEntity } from '@codelab/shared/abstract/types'
import { User } from '@codelab/frontend/domain/user'
import { userDto } from '@codelab/frontend/testing/data'

const mockRepository = (repository: IRepository<IEntity, any, IEntity, {}>) => {
  jest.spyOn(repository, 'add').mockImplementation()
  jest.spyOn(repository, 'delete').mockImplementation()
  jest.spyOn(repository, 'find').mockImplementation()
  jest.spyOn(repository, 'findOne').mockImplementation()
  jest.spyOn(repository, 'update').mockImplementation()
}

export const createTestRootStore = () => {
  const rootStore = new TestRootStore({
    renderer: new Renderer({
      elementTree: elementTreeRef(''),
      rendererType: RendererType.PageBuilder,
    }),
  })

  /**
   * Set user
   */
  rootStore.userService.setUser(User.create(userDto))

  /**
   * Set default fragment type
   */

  mockRepository(rootStore.appService.appRepository)

  jest
    .spyOn(rootStore.atomService, 'getDefaultElementRenderType')
    .mockImplementation()

  return rootStore
}
