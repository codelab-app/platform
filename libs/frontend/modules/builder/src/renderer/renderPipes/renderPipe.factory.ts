import { IRenderPipe, IRenderService } from '@codelab/shared/abstract/core'
import { Ref } from 'mobx-keystone'
import { AtomRenderPipe } from './atomRenderPipe'
import { ComponentRenderPipe } from './componentRenderPipe'
import { ConditionalRenderPipe } from './conditionalRenderPipe'
import { LoopingRenderPipe } from './loopingRenderPipe'
import { NullRenderPipe } from './nullRenderPipe'

type RenderPipeClass =
  // | typeof LoopingRenderPipe
  // | typeof ConditionalRenderPipe
  // | typeof ComponentRenderPipe
  typeof AtomRenderPipe

// define pipes in order of execution, we reverse is to that it matches the order of calling next
export const defaultPipes = (): Array<RenderPipeClass> =>
  [
    LoopingRenderPipe,
    ConditionalRenderPipe,
    ComponentRenderPipe,
    AtomRenderPipe,
  ].reverse()

type RenderPipeFactoryProps = {
  renderer: Ref<IRenderService>
  pipes?: Array<RenderPipeClass>
}

/**
 * We're basically create each pipe, then passing the ref in to the next pipe during instantiation
 */
export const renderPipeFactory = ({
  renderer,
  pipes = defaultPipes(),
}: RenderPipeFactoryProps) =>
  pipes.reduce<IRenderPipe>(
    (acc, Pipe) => {
      console.log(acc, acc.id, Pipe, renderer)

      return new Pipe({ next: acc, renderer })
    },
    // This is the fallback renderer
    new NullRenderPipe({ renderer }),
  )
