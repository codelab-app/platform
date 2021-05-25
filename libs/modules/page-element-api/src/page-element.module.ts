import { ApolloClientModule, DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { PageElementResolver } from './page-element.resolver'
import { CreatePageElementService } from './use-cases'
import { GetLastOrderChildService } from './use-cases/get-last-order-child'
import { GetPageElementService } from './use-cases/get-page-element'

const services = [
  CreatePageElementService,
  GetPageElementService,
  GetLastOrderChildService,
]

@Module({
  imports: [DGraphModule, ApolloClientModule],
  providers: [...services, PageElementResolver],
  exports: [...services],
})
export class PageElementModule {}
