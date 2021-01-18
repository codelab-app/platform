import {
  EventStoreCatchupSubscription as ESCatchUpSubscription,
  EventStorePersistentSubscription as ESPersistentSubscription,
  EventStoreVolatileSubscription as ESVolatileSubscription,
  EventStoreModuleOptions,
  EventStoreOptionConfig,
  EventStorePersistentSubscription,
  EventStoreSubscriptionType,
  EventStoreVolatileSubscription,
  ExtendedCatchUpSubscription,
  ExtendedPersistentSubscription,
  ExtendedVolatileSubscription,
  IAdapterStore,
  IEventConstructors,
  ProvidersConstants,
} from '@juicycleff/nestjs-event-store'
import { EventStoreBroker } from '@juicycleff/nestjs-event-store/build/main/lib/brokers'
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { EventBus, IEvent, IEventPublisher, IMessageSource } from '@nestjs/cqrs'
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service'
import {
  EventData,
  EventStoreCatchUpSubscription,
  ResolvedEvent,
  createJsonEventData,
  expectedVersion,
} from 'node-eventstore-client'
import { Subject } from 'rxjs'
import { Long } from 'typeorm'
import { v4 } from 'uuid'
import { ICodelabEvent } from './ICodelabEvent'

@Injectable()
export class CodelabEventStore
  implements IEventPublisher, OnModuleDestroy, OnModuleInit, IMessageSource {
  private logger = new Logger(this.constructor.name)

  private eventStore: EventStoreBroker

  private declare store: IAdapterStore | undefined

  private declare eventHandlers: IEventConstructors

  private declare subject$: Subject<IEvent>

  private readonly featureStream?: string

  private catchupSubscriptions: Array<Promise<ExtendedCatchUpSubscription>> = []

  private declare catchupSubscriptionsCount: number

  private persistentSubscriptions: Array<ExtendedPersistentSubscription> = []

  private declare persistentSubscriptionsCount: number

  private volatileSubscriptions: Array<ExtendedVolatileSubscription> = []

  private declare volatileSubscriptionsCount: number

  constructor(
    @Inject(ProvidersConstants.EVENT_STORE_PROVIDER) eventStore: any,
    @Inject(ProvidersConstants.EVENT_STORE_CONNECTION_CONFIG_PROVIDER)
    configService: EventStoreModuleOptions,
    @Inject(ProvidersConstants.EVENT_STORE_STREAM_CONFIG_PROVIDER)
    esStreamConfig: EventStoreOptionConfig,
    private readonly explorerService: ExplorerService,
    private readonly eventsBus: EventBus,
  ) {
    this.eventStore = eventStore
    this.featureStream = esStreamConfig.featureStreamName
    if (esStreamConfig.type === 'event-store') {
      this.store = esStreamConfig.store
    } else {
      throw new Error('Event store type is not supported - (event-tore.ts)')
    }

    this.addEventHandlers(esStreamConfig.eventHandlers)
    if (configService.type === 'event-store') {
      this.eventStore.connect(configService.options, configService.tcpEndpoint)

      const catchupSubscriptions = esStreamConfig.subscriptions.filter(
        (sub) => {
          return sub.type === EventStoreSubscriptionType.CatchUp
        },
      )
      const persistentSubscriptions = esStreamConfig.subscriptions.filter(
        (sub) => {
          return sub.type === EventStoreSubscriptionType.Persistent
        },
      )
      const volatileSubscriptions = esStreamConfig.subscriptions.filter(
        (sub) => {
          return sub.type === EventStoreSubscriptionType.Volatile
        },
      )

      this.subscribeToCatchUpSubscriptions(
        catchupSubscriptions as Array<ESCatchUpSubscription>,
      )
      this.subscribeToPersistentSubscriptions(
        persistentSubscriptions as Array<ESPersistentSubscription>,
      )
      this.subscribeToVolatileSubscriptions(
        volatileSubscriptions as Array<ESVolatileSubscription>,
      )
    } else {
      throw new Error(
        'Event store type is not supported for feature - (event-tore.ts)',
      )
    }
  }

  async publish(event: ICodelabEvent, stream?: string) {
    if (event === undefined) {
      return
    }

    if (event === null) {
      return
    }

    const eventPayload: EventData = createJsonEventData(
      v4(),
      event,
      event.metadata ? event.metadata : null,
      stream,
    )

    const streamId = stream || this.featureStream

    try {
      const result = await this.eventStore
        .getClient()
        .appendToStream(streamId as string, expectedVersion.any, [eventPayload])

      return eventPayload
    } catch (err) {
      this.logger.error(err)
    }
  }

  async subscribeToPersistentSubscriptions(
    subscriptions: Array<ESPersistentSubscription>,
  ) {
    this.persistentSubscriptionsCount = subscriptions.length
    // @ts-ignore
    this.persistentSubscriptions = await Promise.all(
      subscriptions.map(async (subscription) => {
        return await this.subscribeToPersistentSubscription(
          subscription.stream,
          subscription.persistentSubscriptionName,
        )
      }),
    )
  }

  async subscribeToCatchUpSubscriptions(
    subscriptions: Array<ESCatchUpSubscription>,
  ) {
    this.catchupSubscriptionsCount = subscriptions.length
    // @ts-ignore
    this.catchupSubscriptions = subscriptions.map(async (subscription) => {
      let lcp = subscription.lastCheckpoint

      if (this.store) {
        lcp = await this.store.read(this.store.storeKey)
      }

      return this.subscribeToCatchupSubscription(
        subscription.stream,
        subscription.resolveLinkTos,
        // @ts-ignore
        lcp,
      )
    })
  }

  async subscribeToVolatileSubscriptions(
    subscriptions: Array<ESVolatileSubscription>,
  ) {
    this.volatileSubscriptionsCount = subscriptions.length
    // @ts-ignore
    this.volatileSubscriptions = await Promise.all(
      subscriptions.map(async (subscription) => {
        return await this.subscribeToVolatileSubscription(
          subscription.stream,
          subscription.resolveLinkTos,
        )
      }),
    )
  }

  subscribeToCatchupSubscription(
    stream: string,
    resolveLinkTos = true,
    lastCheckpoint: number | Long | null = 0,
  ): ExtendedCatchUpSubscription | undefined {
    this.logger.log(`Catching up and subscribing to stream ${stream}!`)
    try {
      return this.eventStore.getClient().subscribeToStreamFrom(
        stream,
        // @ts-ignore
        lastCheckpoint,
        resolveLinkTos,
        (sub, payload) => this.onEvent(sub, payload),
        (subscription) =>
          this.onLiveProcessingStarted(
            subscription as ExtendedCatchUpSubscription,
          ),
        (sub, reason, error) =>
          // @ts-ignore
          this.onDropped(sub as ExtendedCatchUpSubscription, reason, error),
      ) as ExtendedCatchUpSubscription
    } catch (err) {
      this.logger.error(err)
    }
  }

  async subscribeToVolatileSubscription(
    stream: string,
    resolveLinkTos = true,
  ): Promise<ExtendedVolatileSubscription | undefined> {
    this.logger.log(`Volatile and subscribing to stream ${stream}!`)
    try {
      const resolved = (await this.eventStore.getClient().subscribeToStream(
        stream,
        resolveLinkTos,
        // @ts-ignore
        (sub, payload) => this.onEvent(sub, payload),
        (sub, reason, error) =>
          // @ts-ignore
          this.onDropped(sub as ExtendedVolatileSubscription, reason, error),
      )) as ExtendedVolatileSubscription

      this.logger.log('Volatile processing of EventStore events started!')
      resolved.isLive = true

      return resolved
    } catch (err) {
      this.logger.error(err)
    }
  }

  get allCatchUpSubscriptionsLive(): boolean {
    const initialized =
      this.catchupSubscriptions.length === this.catchupSubscriptionsCount

    return (
      initialized &&
      this.catchupSubscriptions.every(async (subscription) => {
        const s = await subscription

        return !!s && s.isLive
      })
    )
  }

  get allVolatileSubscriptionsLive(): boolean {
    const initialized =
      this.volatileSubscriptions.length === this.volatileSubscriptionsCount

    return (
      initialized &&
      this.volatileSubscriptions.every((subscription) => {
        return !!subscription && subscription.isLive
      })
    )
  }

  get allPersistentSubscriptionsLive(): boolean {
    const initialized =
      this.persistentSubscriptions.length === this.persistentSubscriptionsCount

    return (
      initialized &&
      this.persistentSubscriptions.every((subscription) => {
        return !!subscription && subscription.isLive
      })
    )
  }

  async subscribeToPersistentSubscription(
    stream: string,
    subscriptionName: string,
  ): Promise<ExtendedPersistentSubscription | undefined> {
    try {
      this.logger.log(`
       Connecting to persistent subscription ${subscriptionName} on stream ${stream}!
      `)

      const resolved = (await this.eventStore
        .getClient()
        .connectToPersistentSubscription(
          stream,
          subscriptionName,
          (sub, payload) => this.onEvent(sub, payload),
          (sub, reason, error) =>
            // @ts-ignore
            this.onDropped(
              sub as ExtendedPersistentSubscription,
              reason,
              // @ts-ignore
              error,
            ),
        )) as ExtendedPersistentSubscription

      resolved.isLive = true

      return resolved
    } catch (err) {
      this.logger.error(err.message)
    }
  }

  async onEvent(
    _subscription:
      | EventStorePersistentSubscription
      | EventStoreCatchUpSubscription
      | EventStoreVolatileSubscription,
    payload: ResolvedEvent,
  ) {
    const { event } = payload

    if (!event || !event.isJson) {
      this.logger.error('Received event that could not be resolved!')

      return
    }

    const handler = this.eventHandlers[event.eventType]

    if (!handler) {
      this.logger.error('Received event that could not be handled!')

      return
    }

    const rawData = JSON.parse(event.data?.toString() as string)
    const data = Object.values(rawData)

    const eventType = event.eventType || rawData.content.eventType

    if (this.eventHandlers && this.eventHandlers[eventType]) {
      this.subject$.next(this.eventHandlers[event.eventType](...data))
      if (
        this.store &&
        _subscription.constructor.name === 'EventStoreStreamCatchUpSubscription'
      ) {
        await this.store.write(
          this.store.storeKey,
          payload.event?.eventNumber.toInt() as number,
        )
      }
    } else {
      Logger.warn(
        `Event of type ${eventType} not handled`,
        this.constructor.name,
      )
    }
  }

  onDropped(
    subscription:
      | ExtendedPersistentSubscription
      | ExtendedCatchUpSubscription
      | ExtendedVolatileSubscription,
    _reason: string,
    error: Error,
  ) {
    subscription.isLive = false
    this.logger.error(`onDropped => ${error}`)
  }

  onLiveProcessingStarted(subscription: ExtendedCatchUpSubscription) {
    subscription.isLive = true
    this.logger.log('Live processing of EventStore events started!')
  }

  get isLive(): boolean {
    return (
      this.allCatchUpSubscriptionsLive &&
      this.allPersistentSubscriptionsLive &&
      this.allVolatileSubscriptionsLive
    )
  }

  addEventHandlers(eventHandlers: IEventConstructors) {
    this.eventHandlers = { ...this.eventHandlers, ...eventHandlers }
  }

  onModuleInit(): any {
    this.subject$ = (this.eventsBus as any).subject$
    this.bridgeEventsTo((this.eventsBus as any).subject$)
    this.eventsBus.publisher = this
  }

  onModuleDestroy(): any {
    this.eventStore.close()
  }

  // async bridgeEventsTo<T extends IEvent>(subject: Subject<T>): Promise<any> {
  async bridgeEventsTo(subject: Subject<any>): Promise<any> {
    this.subject$ = subject
  }
}
