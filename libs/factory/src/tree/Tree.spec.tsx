import { TreeNodeI, ReactNodeI } from '@codelab/graph'
import { mocked } from 'ts-jest/utils'
import { TreeFactoryMethod, TreeOrder, TreeType } from './Tree-factory'
import { TreeStrategyReact } from './strategy/Tree-strategy--react'
import { TreeStrategyGraph } from './strategy/Tree-strategy--graph'
import { TreeStrategyTree } from './strategy/Tree-strategy--tree'

/**
 * This is an integration test for a factory method. We're testing whether the correct class and methods are called given the input parameter.
 *
 * We're not testing the internals of the strategy, we'll leave that to a unit test.
 */
describe('Tree factory method', () => {
  const treeFactory = new TreeFactoryMethod()

  let reactStrategy: TreeStrategyReact
  let treeStrategy: TreeStrategyTree
  let graphStrategy: TreeStrategyGraph

  const reactDataMock: ReactNodeI = mocked({
    id: '',
    nodeType: 'React',
    type: 'Button',
  })
  const treeDataMock: TreeNodeI = mocked({
    id: '',
    nodeType: 'Tree',
  })
  const graphDataMock: TreeNodeI = mocked({
    id: '',
    nodeType: 'Tree',
  })

  const reactOrder: TreeOrder = {
    type: TreeType.React,
    data: reactDataMock,
  }
  const treeOrder: TreeOrder = {
    type: TreeType.Tree,
    data: treeDataMock,
  }
  const graphOrder: TreeOrder = {
    type: TreeType.Graph,
    data: graphDataMock,
  }

  let reactStrategySpy: jest.SpyInstance
  let treeStrategySpy: jest.SpyInstance
  let graphStrategySpy: jest.SpyInstance

  beforeEach(() => {
    reactStrategy = new TreeStrategyReact()
    treeStrategy = new TreeStrategyTree()
    graphStrategy = new TreeStrategyGraph()

    reactStrategySpy = jest
      .spyOn(TreeStrategyReact.prototype, 'execute')
      .mockImplementation()
    treeStrategySpy = jest
      .spyOn(TreeStrategyTree.prototype, 'execute')
      .mockImplementation()
    graphStrategySpy = jest
      .spyOn(TreeStrategyGraph.prototype, 'execute')
      .mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('calls the React strategy', () => {
    treeFactory.setStrategy(reactStrategy).createProduct(reactOrder)
    expect(reactStrategySpy).toHaveBeenCalled()
    expect(treeStrategySpy).toHaveBeenCalledTimes(0)
    expect(graphStrategySpy).toHaveBeenCalledTimes(0)
  })

  it('calls the Tree strategy', () => {
    treeFactory.setStrategy(treeStrategy).createProduct(treeOrder)
    expect(treeStrategySpy).toHaveBeenCalled()
    expect(reactStrategySpy).toHaveBeenCalledTimes(0)
    expect(graphStrategySpy).toHaveBeenCalledTimes(0)
  })

  it('calls the Graph strategy', () => {
    treeFactory.setStrategy(graphStrategy).createProduct(graphOrder)
    expect(graphStrategySpy).toHaveBeenCalled()
    expect(reactStrategySpy).toHaveBeenCalledTimes(0)
    expect(treeStrategySpy).toHaveBeenCalledTimes(0)
  })
})
