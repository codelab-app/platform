import { Test, type TestingModule } from '@nestjs/testing'

import { CodelabLoggerModule } from './logger.module'
import { PinoLoggerService } from './pino.logger.service'

describe.skip('Pino logger service', () => {
  let loggerService: PinoLoggerService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CodelabLoggerModule],
    }).compile()

    loggerService = module.get(PinoLoggerService)
  })

  it('can log an object', () => {
    //
  })
})
