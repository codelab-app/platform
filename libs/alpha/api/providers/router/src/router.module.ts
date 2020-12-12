import { Module } from '@nestjs/common'
import { ROUTER_SERVICE, routerServiceProvider } from './router.provider'

@Module({
  providers: [routerServiceProvider],
  exports: [ROUTER_SERVICE],
})
export class RouterModule {}
