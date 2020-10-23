import { RouterService } from './router.service'

export const ROUTER_SERVICE = 'ROUTER_SERVICE'

export const routerServiceProvider = {
  provide: ROUTER_SERVICE,
  useClass: RouterService,
}
