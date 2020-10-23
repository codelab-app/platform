import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { ApiConfigTypes } from '@codelab/api/config'

interface PropsService {
  create: Function
}

@Injectable()
export class GrpcPropsClientService implements OnModuleInit {
  private declare propsService: PropsService

  constructor(
    @Inject(`${ApiConfigTypes.GRPC_PROPS_PACKAGE}`) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.propsService = this.client.getService<PropsService>('PropsService')
  }

  create() {
    console.log('client calling server')

    return this.propsService.create({ values: 'my props' })
  }
}
