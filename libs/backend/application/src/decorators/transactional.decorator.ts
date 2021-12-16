import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { TransactionInterceptor } from '../interceptors'

export const Transactional = () =>
  applyDecorators(UseInterceptors(TransactionInterceptor))
