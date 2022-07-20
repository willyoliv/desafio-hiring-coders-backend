import {
  ClientsConfig,
  method,
  LRUCache,
  Service,
  ServiceContext,
  RecorderState,
  EventContext,
} from '@vtex/api'

import { Clients } from './clients'
import { readyForHandlingEvent } from './events/readyForHandling'
import { getClientsPoints } from './middlewares/getClientsPoints'


const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface StatusChangeContext extends EventContext<Clients> {
    body: {
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }
  interface State extends RecorderState { }
}

export default new Service({
  clients,
  events: {
    readyForHandlingEvent,
  },
  routes: {
    points: method({
      GET: [getClientsPoints],
    }),
  },
})
