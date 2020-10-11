import { ActorRefLike } from '@xstate/react/lib/types'
import { Actor, EventObject, Sender } from 'xstate'

/**
 * Add TContext to useActor
 */
declare module '@xstate/react' {
  function useActor<TContext, TEvent extends EventObject, TEmitted = any>(
    actorRef: ActorRefLike<TEvent, TEmitted> | Actor<TContext, TEvent>,
    getSnapshot?: (actor: typeof actorRef) => TEmitted,
  ): [TEmitted, Sender<TEvent>]
}
