import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

@Controller()
export class GrpcPropsServerController {
  @GrpcMethod('PropsService', 'Create')
  create(data: any, metadata: any): any {
    console.log(data, metadata)

    return {
      id: 1,
      values: 'my-props',
    }
  }
}
