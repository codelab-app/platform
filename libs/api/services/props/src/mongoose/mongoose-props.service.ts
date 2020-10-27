import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MongooseProps, PropsDocument } from './mongoose-props.schema'
import { NodeCreateInput } from '@codelab/api/services/node'

@Controller()
export class MongoosePropsService {
  constructor(
    @InjectModel(MongooseProps.__name)
    private PropsModel: Model<PropsDocument>,
  ) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @GrpcMethod('PropsService', 'CreateProps')
  async create(propsCreateDto: NodeCreateInput): Promise<any> {
    // const props = new this.PropsModel(propsCreateDto)

    // const results: any = await props.save()

    // const entity = new PropsEntity(results)

    // console.log(entity)

    return {
      id: 1,
      type: 'REACT_BUTTON',
      values: {},
    }
  }
}
