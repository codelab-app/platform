import Joi from '@hapi/joi'
import { Specification } from '../../../../../shared/core/src/application/common/Specification'

export class IsGoodPasswordStrength<P, T> extends Specification<P, T> {
  rules = Joi.string().min(3).required()
}
