import { DgraphProvider, DgraphTokens, GraphqlService } from '@codelab/backend'
import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiServerService } from '../../api-server/api-server.service'
import { GraphqlCodegenService } from '../../graphql-codegen/graphql-codegen.service'
import { AppServiceProvider } from '../app.providers'
import { AppE2eTokens } from './config/app-e2e.tokens'

export const appE2eProvider: Provider<AppServiceProvider> = {
  provide: AppE2eTokens.AppE2eService,
  useFactory: (
    configService: ConfigService,
    apiServerService: ApiServerService,
    graphqlService: GraphqlService,
    dgraphProvider: DgraphProvider,
    graphqlCodegenService: GraphqlCodegenService,
  ) => {
    return new AppServiceProvider(
      configService,
      apiServerService,
      graphqlService,
      dgraphProvider,
      graphqlCodegenService,
    )
  },
  inject: [
    ConfigService,
    ApiServerService,
    GraphqlService,
    DgraphTokens.DgraphProvider,
    GraphqlCodegenService,
  ],
}
