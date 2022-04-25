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

export const renderPipeFactory = (fallback = new NullRenderPipe({})) =>
  pipes.reduce((acc, Pipe) => new Pipe({ next: acc }), fallback)
