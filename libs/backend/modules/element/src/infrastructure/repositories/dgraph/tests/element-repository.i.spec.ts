import { ITransaction, TransactionManager } from '@codelab/backend/infra'
import { testUserUid } from '@codelab/backend/shared/generic'
import {
  makeTestUser,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import {
  AtomType,
  attachComponentTag,
  createElement,
  IElement,
  IElementGraph,
  Role,
} from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import {
  ElementExistsAndOwnerResponse,
  GetReferencesResponse,
  IElementRepository,
  IElementRepositoryToken,
} from '../../abstract/element-repository.interface'

const testHookInput = {
  type: AtomType.HookGraphqlQuery,
  config: { data: '{}' },
}

const testPmbInput = { sourceKey: 'src', targetKey: 'target' }

const testElementInput = createElement({
  name: 'Some element',
  props: { data: '{}' },
  css: 'background: red;',
  hooks: [testHookInput],
  propMapBindings: [testPmbInput],
  owner: { id: testUserUid },
  propTransformationJs: 'function(data) { return data; }',
  renderIfPropKey: 'render',
  renderForEachPropKey: 'renderForEach',
})

const testComponentInput: IElement = { ...testElementInput }

attachComponentTag(testComponentInput, makeTestUser(Role.User))

describe('Element repository test', function () {
  let app: INestApplication
  let repo: IElementRepository
  let transactionManager: TransactionManager
  let transaction: ITransaction

  beforeAll(async () => {
    app = await setupTestModule([ElementModule], {
      role: Role.User,
      resetDb: true,
    })
    repo = app.get<IElementRepository>(IElementRepositoryToken)
    transactionManager = app.get(TransactionManager)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  beforeEach(() => {
    transaction = transactionManager.generateTransaction()
  })

  afterEach(() => {
    transaction.discard()
  })

  it('should be injected', () => {
    expect(repo).toBeDefined()
  })

  it('should create, get and update element', async () => {
    // Create an element
    const { id } = await repo.create(testElementInput, transaction)
    const getElement = await repo.getOne(id, transaction)

    if (!getElement) {
      throw new Error('Element not found')
    }

    // Ensure element is created with correct data
    expect(getElement).toEqual({
      ...testElementInput,
      fixedId: expect.any(String),
      id,
      props: { ...testElementInput.props, id: expect.any(String) },
      hooks: [
        {
          ...testElementInput.hooks[0],
          id: expect.any(String),
          config: {
            ...testElementInput.hooks[0].config,
            id: expect.any(String),
          },
        },
      ],
      propMapBindings: [
        { ...testElementInput.propMapBindings[0], id: expect.any(String) },
      ],
    })

    // Update the element with some new data
    const newName = 'Some other name'

    getElement.name = newName

    const deletedHookId = getElement.hooks[0].id
    getElement.hooks = [] // remove the old hook, add two new
    getElement.hooks?.push({ ...testElementInput.hooks[0] })
    getElement.hooks?.push({ ...testElementInput.hooks[0] })

    // Update the first pmb, add a new one
    const newPmbTargetKey = 'newKey'
    getElement.propMapBindings[0].targetKey = newPmbTargetKey
    getElement.propMapBindings?.push({ ...testElementInput.propMapBindings[0] })

    await repo.update(getElement, transaction)

    const updatedElement = await repo.getOne(id, transaction)

    // Ensure element is updated with correct data
    expect(updatedElement).toEqual({
      ...testElementInput,
      id,
      name: newName,
      props: { ...testElementInput.props, id: expect.any(String) },
      hooks: [
        {
          ...testElementInput.hooks[0],
          id: expect.any(String),
          config: {
            ...testElementInput.hooks[0].config,
            id: expect.any(String),
          },
        },
        {
          ...testElementInput.hooks[0],
          id: expect.any(String),
          config: {
            ...testElementInput.hooks[0].config,
            id: expect.any(String),
          },
        },
      ],
      propMapBindings: [
        {
          ...testElementInput.propMapBindings[0],
          id: getElement.propMapBindings[0].id,
          targetKey: newPmbTargetKey,
        },
        {
          ...testElementInput.propMapBindings[0],
          id: expect.any(String),
        },
      ],
    })

    // Make sure we can't find the old deleted hook
    const foundDeleted = updatedElement?.hooks?.find(
      (hook) => hook.id === deletedHookId,
    )

    expect(foundDeleted).toBeFalsy()
  })

  it('should get last order in parent', async () => {
    const parent = await repo.create(testElementInput, transaction)

    await repo.create(
      { ...testElementInput, parentElement: { id: parent.id, order: 1 } },
      transaction,
    )

    await repo.create(
      { ...testElementInput, parentElement: { id: parent.id, order: 6 } },
      transaction,
    )

    await repo.create(
      { ...testElementInput, parentElement: { id: parent.id, order: 3 } },
      transaction,
    )

    const lastOrder = await repo.getLastOrderInParent(parent.id, transaction)

    expect(lastOrder).toBe(6)
  })

  it('should check if element exists and has owner', async () => {
    const element = await repo.create(testElementInput, transaction)

    const elementExists = await repo.elementExistsAndGetOwner(
      element.id,
      transaction,
    )

    expect(elementExists).toEqual({
      ownerId: testElementInput.owner?.id,
      elementExists: true,
    } as ElementExistsAndOwnerResponse)
  })

  it('should check if element exists and has owner for non-existing element', async () => {
    const elementExists = await repo.elementExistsAndGetOwner(
      '0x999999999999',
      transaction,
    )

    expect(elementExists).toEqual({
      ownerId: undefined,
      elementExists: false,
    } as ElementExistsAndOwnerResponse)
  })

  // TODO check if component is root in page module's tests
  it('should check if component is not root', async () => {
    const element = await repo.create(testElementInput, transaction)
    const isRoot = await repo.isElementRoot(element.id, transaction)

    expect(isRoot).toBe(false)

    const child = await repo.create(
      { ...testElementInput, parentElement: { id: element.id } },
      transaction,
    )

    const isChildRoot = await repo.isElementRoot(child.id, transaction)

    expect(isChildRoot).toBe(false)
  })

  it('should not get references for element without references', async () => {
    const element = await repo.create(testElementInput, transaction)
    const elementRefs = await repo.getReferences(element.id, transaction)

    expect(elementRefs).toEqual({ componentInstances: [] })
  })

  it('should get references for element with a parent and component instances', async () => {
    const parent = await repo.create(testElementInput, transaction)

    const componentChildInput: IElement = {
      ...testComponentInput,
      parentElement: { id: parent.id },
    }

    attachComponentTag(componentChildInput, makeTestUser(Role.User))

    const component = await repo.create(componentChildInput, transaction)

    const ref1 = await repo.create(
      { ...testElementInput, instanceOfComponent: { id: component.id } },
      transaction,
    )

    const ref2 = await repo.create(
      { ...testElementInput, instanceOfComponent: { id: component.id } },
      transaction,
    )

    const refs = await repo.getReferences(component.id, transaction)

    expect(refs).toEqual({
      parentId: parent.id,
      parentName: testElementInput.name,
      componentInstances: [
        { id: ref1.id, name: testElementInput.name },
        { id: ref2.id, name: testElementInput.name },
      ],
    } as GetReferencesResponse)
  })

  it('should get components', async () => {
    const usersComponent = await repo.create(testComponentInput, transaction)

    const sharedComponent = await repo.create(
      { ...testComponentInput, owner: null },
      transaction,
    )

    const components = await repo.getComponents(
      { ownerId: testUserUid },
      transaction,
    )

    const expectedShared = { ...testComponentInput, id: sharedComponent.id }
    delete expectedShared.owner

    expect(components).toMatchObject([
      { ...testComponentInput, id: usersComponent.id },
      expectedShared,
    ])
  })

  it('should get by fixed id', async () => {
    const { id } = await repo.create(testComponentInput, transaction)
    const component = await repo.getOne(id, transaction)

    const found = await repo.getOneByFixedId(
      component?.fixedId ?? '',
      transaction,
    )

    expect(found?.id).toBe(id)
  })

  it('should create and get graph', async () => {
    const root = await repo.create({ ...testElementInput }, transaction)

    const parent = createElement({
      id: 'parent', // those ids should be used just to compose the tree
      name: 'A Parent element',
      props: {},
      parentElement: {
        id: root.id, // should be used, since we don't have an edge to override it
      },
    })

    const child = createElement({
      id: 'child',
      name: 'A child element',
      props: {},
      parentElement: {
        id: 'insignificant-id', // shouldn't matter, must get overridden, since we have an edge
      },
    })

    const grandChild = createElement({ id: 'gc', name: 'hello', props: {} })

    const graph: IElementGraph = {
      vertices: [parent, child, grandChild],
      edges: [
        { source: parent.id, target: child.id, order: 1 },
        { source: child.id, target: grandChild.id, order: 1 },
      ],
    }

    const created = await repo.createGraph(graph, transaction)
    const createdGraph = await repo.getGraph(created.id, transaction)

    const createdChildId = createdGraph.vertices.find(
      (v) => v.name === child.name,
    )?.id

    const createdGcId = createdGraph.vertices.find(
      (v) => v.name === grandChild.name,
    )?.id

    expect(createdGraph).toEqual({
      vertices: [
        {
          ...parent,
          id: created.id,
          parentElement: { ...parent.parentElement, order: 1 },
          props: { ...parent.props, id: expect.any(String) },
        },
        {
          ...child,
          id: createdChildId,
          parentElement: { id: created.id, order: 1 },
          props: { ...parent.props, id: expect.any(String) },
        },
        {
          ...grandChild,
          id: createdGcId,
          parentElement: { id: createdChildId, order: 1 },
          props: { ...parent.props, id: expect.any(String) },
        },
      ],
      edges: [
        { source: created.id, target: createdChildId, order: 1 },
        { source: createdChildId, target: createdGcId, order: 1 },
      ],
    } as IElementGraph)
  })

  it.todo('should get graph by root ids')

  it.todo('should get graph by fixed id')

  it.todo('should add hook')

  it.todo('should remove hook')

  it.todo('should add prop map binding')

  it.todo('should remove prop map binding')
})
