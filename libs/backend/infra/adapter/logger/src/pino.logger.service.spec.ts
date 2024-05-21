import { Test, type TestingModule } from '@nestjs/testing'
import { CodelabLoggerModule } from './logger.module'
import { CodelabLoggerService } from './pino.logger.service'

describe.skip('Pino logger service', () => {
  let loggerService: CodelabLoggerService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CodelabLoggerModule],
    }).compile()

    loggerService = module.get(CodelabLoggerService)
  })

  it('can log an object', () => {
    //
  })
})
