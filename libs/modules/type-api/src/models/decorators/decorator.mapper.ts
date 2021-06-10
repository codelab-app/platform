import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import {
  ArrayLengthValidatorMapper,
  DgraphArrayLengthValidator,
} from './array-length-validator'
import { Decorator } from './decorator.model'
import { DgraphDecorator } from './dgraph-decorator.model'
import {
  DgraphMinMaxValidator,
  MinMaxValidatorMapper,
} from './min-max-validator'
import {
  DgraphRequiredValidator,
  RequiredValidatorMapper,
} from './required-validator'

@Injectable()
export class DecoratorMapper
  implements IDgraphMapper<DgraphDecorator, Decorator>
{
  constructor(
    private arrayLengthValidatorMapper: ArrayLengthValidatorMapper,
    private minMaxValidatorMapper: MinMaxValidatorMapper,
    private requiredValidatorMapper: RequiredValidatorMapper,
  ) {}

  map(dgraphDecorator: DeepPartial<DgraphDecorator>): Decorator {
    const typeArray = dgraphDecorator[BaseDgraphFields.DgraphType]

    if (!typeArray) {
      throw new Error(
        `The field ${BaseDgraphFields.DgraphType} must be present in order to map decorator`,
      )
    }

    const type = typeArray[0]

    switch (type) {
      case 'ArrayLengthValidator':
        return this.arrayLengthValidatorMapper.map(
          dgraphDecorator as DgraphArrayLengthValidator,
        )
      case 'MinMaxValidator':
        return this.minMaxValidatorMapper.map(
          dgraphDecorator as DgraphMinMaxValidator,
        )
      case 'RequiredValidator':
        return this.requiredValidatorMapper.map(
          dgraphDecorator as DgraphRequiredValidator,
        )
      default:
        throw new Error("Can't parse dgraph decorator of type " + type)
    }
  }
}
