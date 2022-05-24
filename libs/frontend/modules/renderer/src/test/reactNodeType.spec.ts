import { ComponentRenderPipe } from '../renderPipes/componentRenderPipe'
import { setupTestForRenderer } from './setup/setupTest'

/**
 * Should render a prop value of ReactNode
 */
describe('ReactNodeType', () => {
  //
  const data = setupTestForRenderer([
    // LoopingRenderPipe,
    // ConditionalRenderPipe,
    ComponentRenderPipe,
    // AtomRenderPipe,
  ])

  it('should render reactNode props', () => {
    //
  })
})
