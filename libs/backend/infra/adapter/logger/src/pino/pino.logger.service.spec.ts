import type { ConfigType } from '@nestjs/config'

import { Test } from '@nestjs/testing'
import { PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino'

import { loggerConfig } from '../logger.config'
import { PinoLoggerService } from './pino.logger.service'

describe('PinoLoggerService', () => {
  let loggerService: PinoLoggerService
  let mockPinoLogger: jest.Mocked<PinoLogger>

  beforeEach(async () => {
    mockPinoLogger = {
      debug: jest.fn(),
      error: jest.fn(),
      fatal: jest.fn(),
      info: jest.fn(),
      trace: jest.fn(),
      warn: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any

    const module = await Test.createTestingModule({
      providers: [
        PinoLoggerService,
        {
          provide: PinoLogger,
          useValue: mockPinoLogger,
        },
        {
          provide: PARAMS_PROVIDER_TOKEN,
          useValue: {},
        },
        {
          provide: loggerConfig.KEY,
          useValue: {
            level: 'debug',
            namespaces: 'repository:*,service:auth,-repository:debug',
            sentryDsn: 'test-dsn',
          } as ConfigType<typeof loggerConfig>,
        },
      ],
    }).compile()

    loggerService = module.get<PinoLoggerService>(PinoLoggerService)
  })

  describe('namespace filtering', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should log when namespace is enabled', () => {
      loggerService.debug('Test message', { context: 'repository:app' })

      expect(mockPinoLogger.debug).toHaveBeenCalledWith({
        context: 'repository:app',
        msg: 'Test message',
      })
    })

    it('should not log when namespace is disabled', () => {
      loggerService.debug('Test message', { context: 'repository:debug' })

      expect(mockPinoLogger.debug).not.toHaveBeenCalled()
    })

    it('should log when namespace matches wildcard', () => {
      loggerService.debug('Test message', { context: 'service:auth' })

      expect(mockPinoLogger.debug).toHaveBeenCalledWith({
        context: 'service:auth',
        msg: 'Test message',
      })
    })

    it('should not log when namespace does not match any pattern', () => {
      loggerService.debug('Test message', { context: 'command:create' })

      expect(mockPinoLogger.debug).not.toHaveBeenCalled()
    })

    it('should not log when no context is provided and wildcard is not enabled', () => {
      loggerService.debug('Test message')

      expect(mockPinoLogger.debug).not.toHaveBeenCalled()
    })
  })

  describe('data inclusion', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should include data for verbose level', () => {
      loggerService.verbose('Test message', {
        context: 'repository:app',
        data: { test: 'value' },
      })

      expect(mockPinoLogger.trace).toHaveBeenCalledWith({
        context: 'repository:app',
        data: { test: 'value' },
        msg: 'Test message',
      })
    })

    it('should include data for debug level', () => {
      loggerService.debug('Test message', {
        context: 'repository:app',
        data: { test: 'value' },
      })

      expect(mockPinoLogger.debug).toHaveBeenCalledWith({
        context: 'repository:app',
        data: { test: 'value' },
        msg: 'Test message',
      })
    })

    it('should exclude data for info level', () => {
      loggerService.log('Test message', {
        context: 'repository:app',
        data: { test: 'value' },
      })

      expect(mockPinoLogger.info).toHaveBeenCalledWith({
        context: 'repository:app',
        msg: 'Test message',
      })
    })

    it('should include data for error level', () => {
      loggerService.error('Test message', {
        context: 'repository:app',
        data: { test: 'value' },
      })

      expect(mockPinoLogger.error).toHaveBeenCalledWith({
        context: 'repository:app',
        data: { test: 'value' },
        msg: 'Test message',
      })
    })
  })
})
