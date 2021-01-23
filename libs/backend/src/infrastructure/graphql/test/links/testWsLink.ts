import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require('ws')

export const testWsLink = (url: string, token?: string) => {
  const client = new SubscriptionClient(
    url.replace('http://', 'ws://'),
    {
      reconnect: true,
      connectionParams: () => ({
        token,
      }),
      timeout: 1000,
    },
    WebSocket,
  )

  return new WebSocketLink(client)
}
