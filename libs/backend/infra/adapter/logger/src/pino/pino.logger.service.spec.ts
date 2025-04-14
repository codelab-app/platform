import { Test } from '@nestjs/testing'

import { CodelabLoggerModule } from '../logger.module'
import { PinoLoggerService } from './pino.logger.service'

describe('PinoLoggerService', () => {
  let loggerService: PinoLoggerService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CodelabLoggerModule],
    }).compile()

    loggerService = module.get<PinoLoggerService>(PinoLoggerService)
  })

  describe('logging output', () => {
    it('should log simple messages', () => {
      loggerService.debug('Some message', {
        context: 'wtf',
        data: { foo: 'bar' },
      })
      // loggerService.debug(
      //   {
      //     requestData: { foo: 'bar' },
      //     /* your extra fields go here */
      //     userId: '123',
      //   },
      //   'some message',
      // )

      // We might want to spy on the actual pino logger methods
      // or check the log output in a more integration-test way
    })

    // it('should include context in output', () => {
    //   loggerService.log('test message', { context: 'TestContext' })

    //   expect(pinoLogger.setContext).toHaveBeenCalledWith('TestContext')
    //   expect(pinoLogger.info).toHaveBeenCalledWith('test message')
    // })

    // it('should include data in output for enabled context', () => {
    //   const testData = { foo: 'bar' }

    //   loggerService.log('test message', {
    //     context: 'data-context',
    //     data: testData,
    //   })

    //   expect(pinoLogger.setContext).toHaveBeenCalledWith('data-context')
    //   expect(pinoLogger.info).toHaveBeenCalledWith('test message', testData)
    // })

    // it('should format error messages appropriately', () => {
    //   const error = new Error('test error')

    //   loggerService.error('error occurred', {
    //     context: 'error-context',
    //     data: error as ObjectLike,
    //   })

    //   expect(pinoLogger.setContext).toHaveBeenCalledWith('error-context')
    //   expect(pinoLogger.error).toHaveBeenCalledWith('error occurred', error)
    // })
  })
})
