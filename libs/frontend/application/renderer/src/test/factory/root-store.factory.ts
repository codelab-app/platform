import { AtomService } from '@codelab/frontend/domain/atom'
import { ComponentService } from '@codelab/frontend/domain/component'
import { ElementService } from '@codelab/frontend/domain/element'
import { PageService } from '@codelab/frontend/domain/page'
import { PropService } from '@codelab/frontend/domain/prop'
import { ResourceService } from '@codelab/frontend/domain/resource'
import { ActionService, StoreService } from '@codelab/frontend/domain/store'
import { TagService } from '@codelab/frontend/domain/tag'
import { FieldService, TypeService } from '@codelab/frontend/domain/type'
import isNil from 'lodash/isNil'
import { RenderService } from '../../render.service'
import { TestRootStore } from '../setup/test-root-store'

let testRootStore: TestRootStore | undefined

if (isNil(testRootStore)) {
  testRootStore = new TestRootStore({
    actionService: new ActionService({}),
    atomService: new AtomService({}),
    componentService: new ComponentService({}),
    elementService: new ElementService({}),
    fieldService: new FieldService({}),
    pageService: new PageService({}),
    propService: new PropService({}),
    renderService: new RenderService({}),
    resourceService: new ResourceService({}),
    storeService: new StoreService({}),
    tagService: new TagService({}),
    typeService: new TypeService({}),
  })
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default testRootStore!
