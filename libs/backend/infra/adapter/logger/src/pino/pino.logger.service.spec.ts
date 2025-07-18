import type { ConfigType } from '@nestjs/config'

import { Test } from '@nestjs/testing'
import { LoggerModule, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino'
import pino from 'pino'
import { Writable } from 'stream'

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
            debug: 'repository:*,service:auth,-repository:debug',
            level: 'debug',
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

    it('should always log when no context is provided', () => {
      loggerService.debug('Test message')

      expect(mockPinoLogger.debug).toHaveBeenCalledWith({
        msg: 'Test message',
      })
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

  describe('terminal output integration', () => {
    let realLoggerService: PinoLoggerService
    let capturedOutput: Array<string> = []

    beforeEach(async () => {
      capturedOutput = []

      // Create a writable stream to capture output
      const testStream = new Writable({
        write: (chunk: Buffer, _encoding: string, callback: () => void) => {
          capturedOutput.push(chunk.toString())
          callback()
        },
      })

      // Create a real Pino logger that writes to our test stream
      const logger = pino({ level: 'trace' }, testStream)

      const module = await Test.createTestingModule({
        imports: [
          LoggerModule.forRoot({
            pinoHttp: {
              logger,
            },
          }),
        ],
        providers: [
          PinoLoggerService,
          {
            provide: loggerConfig.KEY,
            useValue: {
              debug: 'command:*,repository:*',
              level: 'debug',
              sentryDsn: 'test-dsn',
            } as ConfigType<typeof loggerConfig>,
          },
        ],
      }).compile()

      realLoggerService = module.get<PinoLoggerService>(PinoLoggerService)
    })

    it('should output to terminal when namespace matches', () => {
      // Act
      realLoggerService.log('Exporting APIs batch', {
        apiCount: 3,
        context: 'command:export-apis',
      })

      // Assert - check that output was written
      expect(capturedOutput.length).toBeGreaterThan(0)

      const output = capturedOutput.join('')

      expect(output).toContain('Exporting APIs batch')
      expect(output).toContain('command:export-apis')
      expect(output).toContain('apiCount')
    })

    it('should NOT output to terminal when namespace does not match', () => {
      // Act
      realLoggerService.log('Should not appear', {
        context: 'other:namespace',
      })

      // Assert - no output should be captured
      expect(capturedOutput.length).toBe(0)
    })

    it('should output debug logs for matching namespace', () => {
      // Act
      realLoggerService.debug('Debug message', {
        context: 'repository:user',
        data: { userId: '123' },
      })

      // Assert
      expect(capturedOutput.length).toBeGreaterThan(0)

      const output = capturedOutput.join('')

      expect(output).toContain('Debug message')
      expect(output).toContain('repository:user')
      expect(output).toContain('userId')
    })
  })
})
