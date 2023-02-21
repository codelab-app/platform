import ecsFormat from '@elastic/ecs-winston-format'
import winston from 'winston'

const logger = winston.createLogger({
  format: ecsFormat(),
  transports: [new winston.transports.Console()],
})

logger.info('hi')
logger.error('oops there is a problem', { err: new Error('boom') })
