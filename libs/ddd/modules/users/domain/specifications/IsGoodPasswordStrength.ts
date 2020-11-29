import Joi from '@hapi/joi'
import { Specification } from '../../../../shared/domain/src/core/Specification'

export class IsGoodPasswordStrength<P, T> extends Specification<P, T> {
  rules = Joi.string().min(3).required()
}
