import { IRenderService } from '@codelab/shared/abstract/core'
import { AtomRenderPipe } from './atomRenderPipe'
import { ComponentRenderPipe } from './componentRenderPipe'
import { ConditionalRenderPipe } from './conditionalRenderPipe'
import { LoopingRenderPipe } from './loopingRenderPipe'
import { NullRenderPipe } from './nullRenderPipe'

// define pipes in order of execution, we reverse is to that it matches the order of calling next
const pipes = [
  LoopingRenderPipe,
  ConditionalRenderPipe,
  ComponentRenderPipe,
  AtomRenderPipe,
].reverse()

export const renderPipeFactory =
  (renderer: IRenderService) =>
  (fallback = new NullRenderPipe({ renderer })) =>
    pipes.reduce((acc, Pipe) => new Pipe({ next: acc, renderer }), fallback)
