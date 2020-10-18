import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/config'
import { PropsModule } from '@codelab/api/schema/props'

@Module({
  imports: [
    ConfigModule,
    PropsModule,
    // RestifyModule,
    // MongooseModule.forRootAsync({
    //   imports: [],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService<ApiConfig>) => {
    //     return {
    //       uri: config.get('mongoEndpoint'),
    //     }
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
