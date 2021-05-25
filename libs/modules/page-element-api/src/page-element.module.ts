import { ApolloClientModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { PageElementResolver } from './page-element.resolver'
import { GetPageElementRootService } from './use-cases'

const services = [GetPageElementRootService]

@Module({
  imports: [ApolloClientModule],
  providers: [...services, PageElementResolver],
  exports: [...services],
})
export class PageElementModule {}
