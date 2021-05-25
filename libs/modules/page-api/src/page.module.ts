import { ApolloClientModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app-api'
import { Module } from '@nestjs/common'
import { PageResolver } from './page.resolver'
import { CreatePageService } from './use-cases'

@Module({
  imports: [ApolloClientModule, AppModule],
  providers: [CreatePageService, PageResolver],
})
export class PageModule {}
