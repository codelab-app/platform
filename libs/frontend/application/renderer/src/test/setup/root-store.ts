import { AtomService } from '@codelab/frontend/application/atom'
import { ComponentApplicationService } from '@codelab/frontend/application/component'
import { ElementService } from '@codelab/frontend/application/element'
import { PageApplicationService } from '@codelab/frontend/application/page'
import { PropService } from '@codelab/frontend/application/prop'
import {
  ActionService,
  StoreService,
} from '@codelab/frontend/application/store'
import { TagService } from '@codelab/frontend/application/tag'
import { FieldService, TypeService } from '@codelab/frontend/application/type'
import isNil from 'lodash/isNil'
import { RenderService } from '../../render.service'
import { TestRootStore } from './test-root-store'

let testRootStore: TestRootStore | undefined

if (isNil(testRootStore)) {
  testRootStore = new TestRootStore({
    actionService: new ActionService({}),
    atomService: new AtomService({}),
    componentService: new ComponentApplicationService({}),
    elementService: new ElementService({}),
    fieldService: new FieldService({}),
    pageService: new PageApplicationService({}),
    propService: new PropService({}),
    renderService: new RenderService({}),
    storeService: new StoreService({}),
    tagService: new TagService({}),
    typeService: new TypeService({}),
  })
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default testRootStore!
